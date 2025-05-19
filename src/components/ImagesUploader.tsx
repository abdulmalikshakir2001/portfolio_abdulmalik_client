'use client';

import { useState, memo, useCallback, useEffect, useRef } from 'react';
interface ImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}
// Custom hook to properly manage object URLs
function useObjectUrls() {
  // Keep track of mappings between files and their URLs
  const urlMap = useRef(new Map());
  
  // Create a URL for a file, reusing existing ones
  const getObjectUrl = useCallback((file: File) => {
    if (!urlMap.current.has(file)) {
      const url = URL.createObjectURL(file);
      urlMap.current.set(file, url);
    }
    return urlMap.current.get(file);
  }, []);
  
  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      urlMap.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      urlMap.current.clear();
    };
  }, []);

  // Remove specific URLs when files are removed
  const revokeObjectUrl = useCallback((file: File) => {
    const url = urlMap.current.get(file);
    if (url) {
      URL.revokeObjectURL(url);
      urlMap.current.delete(file);
    }
  }, []);

  return { getObjectUrl, revokeObjectUrl };
}

// Interface for ImageThumbnail props
interface ImageThumbnailProps {
  file: File;
  index: number;
  url: string;
  onRemove: (index: number) => void;
}

// Extract thumbnail into its own memoized component
const ImageThumbnail = memo(function ImageThumbnail({ 
  file, 
  index,
  url,
  onRemove 
}: ImageThumbnailProps) {
  // Memoize the click handler to prevent re-renders
  const handleRemoveClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onRemove(index);
  }, [onRemove, index]);

  return (
    <div className="relative group">
      <img
        src={url}
        alt={`upload-${index}`}
        className="w-full h-40 object-cover rounded-lg"
      />
      <button
        onClick={handleRemoveClick}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ×
      </button>
    </div>
  );
});

// The main component, wrapped with React.memo to prevent unnecessary re-renders
const ImageUploader = memo(function ImageUploader({ images, setImages }: ImageUploaderProps) {
  
  const { getObjectUrl, revokeObjectUrl } = useObjectUrls();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Memoize callback functions to preserve their identity across renders
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      console.log('Images added:', newImages); // ✅ Console log added images
      setImages((prev) => [...prev, ...newImages]);
      
      // Reset the file input value to ensure onChange will trigger even if 
      // the same files are selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => {
      const fileToRemove = prev[index];
      // Revoke the URL for the file being removed
      revokeObjectUrl(fileToRemove);
      return prev.filter((_, i) => i !== index);
    });
  }, [revokeObjectUrl]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100">
        <span className="text-gray-600">Click or drag to upload images</span>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((file, index) => (
            <ImageThumbnail 
              key={`${file.name}-${file.lastModified}-${index}`}
              file={file} 
              index={index}
              url={getObjectUrl(file)}
              onRemove={removeImage} 
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ImageUploader;