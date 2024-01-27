'use client'
import Input from '@/components/Input';
import { fetchApi } from '@/utility_functions/fetchApi';
import { fetchApiForm } from '@/utility_functions/fetchApiForm';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function UploadProject() {
  const [title,setTitle] =  useState("");
  const [image, setImage] = useState('');
  const handleSubmit = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    //  send form data to server 
    fetchApiForm('/api/project/uploadProject',"POST",formData).then((data)=>{
      if(data.status === true){
        // alert('project uploaded')
        toast.success('🦄 Project uploaded successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        setTitle("")
        setImage("")
      }
      else{
        toast.success('🦄 Some thing went wrong', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

      }
      
    })

    
  }
  function onImageChange(event) {
    setImage(event.target.files[0]);
  }
  return (
    <>
      <form  onSubmit={  handleSubmit} >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 flex flex-col ">
            <div className='flex flex-col items-center'>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Note</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                enter title and image of the project to display for users.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
              <div className="sm:row-start-1 sm:row-end-2 sm:col-start-2 sm:col-end-6">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                      Title
                    </label>
                    <div className="mt-2 ">
                      <div className=" rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      
                        <Input  type="text" name="title" id="title"  placeholder="title" input={title} setInput={setTitle} />
                        
                      </div>
                    </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="image" name="image" type="file" className="sr-only" onChange={onImageChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>






        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

    </>
  );
}

export default UploadProject;
