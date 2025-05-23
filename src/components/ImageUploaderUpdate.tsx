'use client';

import { useCallback, useEffect, useRef, useState, memo } from 'react';

interface ImageUploaderUpdateProps {
  serverImageUrls: string[];
  setServerImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  uploadedImages: File[];
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
}

interface ImageThumbnailProps {
  url: string;
  onRemove: () => void;
}

// Memoized thumbnail display
const ImageThumbnail = memo(function ImageThumbnail({ url, onRemove }: ImageThumbnailProps) {
  return (
    <div className="relative group">
      <img
        src={url}
        alt="uploaded"
        className="w-full h-40 object-cover rounded-lg"
      />
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ×
      </button>
    </div>
  );
});

// Main component
const ImageUploaderUpdate = memo(function ImageUploaderUpdate({
  serverImageUrls,
  setServerImageUrls,
  uploadedImages,
  setUploadedImages,
}: ImageUploaderUpdateProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Generate object URLs for uploaded files
  useEffect(() => {
    const urls = uploadedImages.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [uploadedImages]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      console.log('Images added:', files);
      setUploadedImages((prev) => [...prev, ...files]);

      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, []);

  const removeServerImage = useCallback((index: number) => {
    setServerImageUrls((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const removeUploadedImage = useCallback((index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

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

      {(serverImageUrls.length > 0 || uploadedImages.length > 0) && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Server images */}
          {serverImageUrls.map((url, index) => (
            <ImageThumbnail
              key={`server-${url}-${index}`}
              url={`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`}
              onRemove={() => removeServerImage(index)}
            />
          ))}

          {/* Uploaded images (previews) */}
          {previewUrls.map((url, index) => (
            <ImageThumbnail
              key={`uploaded-${url}-${index}`}
              url={url}
              onRemove={() => removeUploadedImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ImageUploaderUpdate;
