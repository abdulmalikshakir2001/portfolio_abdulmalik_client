"use client";

import   { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Upload, Plus, Pencil, Trash2, X, CloudCog } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import ImageUploader from '@/components/ImagesUploader';
import ImageUploaderUpdate from '@/components/ImageUploaderUpdate';

interface Project {
  id: string;
  title: string;
  description: string;
  image_path: string;
  createdAt: string;
}


interface ProjectFormData {
  title: string;
  description: string;
  image: File | null;
}

const  ProjectForm =   ()=> {
  console.log('parent re render on child chagne')

  
  // State for projects list and loading status
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [serverImageUrls, setServerImageUrls] = useState<string[]>([]);


  const handleSetImages: React.Dispatch<React.SetStateAction<File[]>> = (value) => {
    setImages((prevImages) => {
      const newImages = typeof value === 'function' ? value(prevImages) : value;
  
      // Detect added or removed images
      if (newImages.length > prevImages.length) {
        const added = newImages.slice(prevImages.length);
        console.log('🟢 Images added:', added);
      } else if (newImages.length < prevImages.length) {
        const removed = prevImages.filter(img => !newImages.includes(img));
        console.log('🔴 Images removed:', removed);
      }
  
      return newImages;
    });
  };
  useEffect(() => {
    console.log(projects);
    
  
    
  }, [projects]);

  // State for modal and form handling
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  // Fetch all projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to fetch all projects

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/projects`);
      
      
      if (!res.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await res.json();
      
      // Ensure data is an array before setting it to state
      setProjects(Array.isArray(data.data) ? data.data : (data.data || []));
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to open modal for creating a new project
  const handleAddProject = () => {
    resetForm();
    setIsEditing(false);
    setCurrentProjectId(null);
    setShowModal(true);
  };

  // Function to open modal for editing an existing project
  const handleEditProject = async (projectId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/projects/${projectId}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch project details');
      }

      const project = await res.json();
      
      console.log(project.data);
      
      setCurrentProjectId(project.data.id)
      
      setFormData({
        title: project.data.title,
        description: project.data.description,
        image: null,
      });
      
      
      setImagePreview(`${process.env.NEXT_PUBLIC_SERVER_URL}${project.data.image_path}`);
      setIsEditing(true);
      setCurrentProjectId(projectId);
      setShowModal(true);
      setError(null);
      setImages(project.data.images_paths);
      setServerImageUrls(project.data.images_paths)
    } catch (err) {
      console.error('Error fetching project details:', err);
      setError('Failed to load project details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a project
  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete project');
      }

      // Refresh projects list after deletion
      fetchProjects();
      setError(null);
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project. Please try again later.');
    }
  };

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle TinyMCE editor content changes
  const handleDescriptionChange = (content: string) => {
    setFormData({ ...formData, description: content });
  };

  // Handle image file selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      
      //  image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({ title: '', description: '', image: null });
    setImagePreview('');
  };

  // Close modal and reset form
  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleImagesChange = (images: File[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  // Handle form submission for both create and update operations
  const handleSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
  
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('image', formData.image!); // Single thumbnail
  
    // ✅ Append multiple images
    images.forEach((image, index) => {
      data.append('images', image); // backend should accept multiple "images"
    });
  
    try {
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/projects`;
      let method = 'POST';
  
      if (isEditing && currentProjectId) {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/projects/${currentProjectId}`;
        method = 'PUT';
      }
  
      const res = await fetch(url, {
        method: method,
        body: data,
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An error occurred');
      }
  
      // Refresh the projects list and close the modal
      fetchProjects();
      closeModal();
      setError(null);
    } catch (err: any) {
      console.error('Error submitting project:', err);
      setError(err.message || 'Failed to save project. Please try again later.');
    }
  };

  
  const handleSubmitUpdate = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Validation
  if (!formData.title || !formData.description) {
    alert('Please fill in all required fields');
    return;
  }

  if (!currentProjectId) {
    setError('No project selected for update');
    return;
  }

  try {
    setLoading(true);
    
    // Create FormData for multipart/form-data request
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    
    // Add main project image if user selected a new one
    if (formData.image) {
      data.append('image', formData.image);
    }
    
    // Send retained server image URLs as JSON string (matching backend expectation)
    data.append('retainedServerImageUrls', JSON.stringify(serverImageUrls || []));
    
    // Send newly uploaded images as 'images' (matching backend req.files?.images)
    if (uploadedImages && uploadedImages.length > 0) {
      uploadedImages.forEach((image) => {
        data.append('images', image);
      });
    }

    console.log('Updating project with:', {
      title: formData.title,
      description: formData.description.substring(0, 50) + '...',
      hasNewThumbnail: !!formData.image,
      retainedImages: serverImageUrls?.length || 0,
      newImages: uploadedImages?.length || 0
    });

    // Make the API call
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/projects/project/${currentProjectId}`, {
      method: 'PUT',
      body: data,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const responseData = await res.json();
    console.log('Project updated successfully:', responseData);

    // Refresh projects list to get updated data
    await fetchProjects();

    // Reset form and close modal
    closeModal();
    setError(null);
    
    // Reset image states
    setImages([]);
    setUploadedImages([]);
    setServerImageUrls([]);
    
    // Show success message
    alert('Project updated successfully!');

  } catch (err: any) {
    console.error('Error updating project:', err);
    setError(err.message || 'Failed to update project. Please try again later.');
  } finally {
    setLoading(false);
  }
};
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  if (isEditing) {
    await handleSubmitUpdate(e);
  } else {
    await handleSubmitCreate(e);
  }
};


  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Truncate text for table display
  const truncateText = (text: string, maxLength: number) => {
    // Remove HTML tags for clean preview
    const plainText = text.replace(/<[^>]+>/g, '');
    return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={handleAddProject}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-1" size={16} />
          Add Project
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && !showModal ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading projects...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
                        {projects && projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No projects found. Add your first project!</p>
            </div>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-20 px-4 py-2 text-left text-gray-600">Image</th>
                  <th className="px-4 py-2 text-left text-gray-600">Title</th>
                  <th className="px-4 py-2 text-left text-gray-600">Description</th>
                  <th className="px-4 py-2 text-left text-gray-600">Date Created</th>
                  <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(projects) && projects.map((project) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      
                      <img 
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${project.image_path}`} 
                        alt={project.title} 
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 font-medium">{project.title }</td>
                    <td className="px-4 py-2">{truncateText(project.description, 100)}</td>
                    <td className="px-4 py-2">{formatDate(project.createdAt)}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProject(project.id )}
                          className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          )}
        </div>
      )}




      {/* Modal for Create/Edit Project */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {isEditing ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit= {handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Project Image {!isEditing && <span className="text-red-500">*</span>}
                </label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                  {!imagePreview ? (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  ) : (
                    <div className="relative w-full h-48">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mx-auto max-h-full object-contain"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setFormData({...formData, image: null});
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required={!isEditing && !imagePreview}
                  />
                  <label
                    htmlFor="image"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                  >
                    {isEditing ? 'Change Image' : 'Select Image'}
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter project title"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <Editor
                  apiKey="no-api-key"
                  value={formData.description}
                  onEditorChange={handleDescriptionChange}
                  init={{
  height: 300,
  menubar: false,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
  ],
  toolbar:
    'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
}}
                />
              </div>

              <div className='mb-6'>
              {!isEditing ? (
  <ImageUploader images={images} setImages={handleSetImages} />
) : (
  <ImageUploaderUpdate
    serverImageUrls={serverImageUrls}
    setServerImageUrls={setServerImageUrls}
    uploadedImages={uploadedImages}
    setUploadedImages={setUploadedImages}
  />
)}


              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                 {isEditing ? (
    <button
      type="submit"
      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Update Project
    </button>
  ) : (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Create Project
    </button>
  )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProjectForm;