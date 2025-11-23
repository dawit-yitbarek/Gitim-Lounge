import React, { useRef, useState, useEffect } from 'react';
import { publicApi } from './Api';

export default function UploadImage({ setImageUrl, resetTrigger, status, showPreview, center, setLoading }) {
    const [preview, setPreview] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            setPreview(null);
            setUploadSuccess(false);
            return;
        }

        setPreview(URL.createObjectURL(file)); // Show preview
        const formData = new FormData();
        formData.append('image', file);

        try {
            setUploadError(false);
            setUploading(true);
            setLoading(true);
            const res = await publicApi.post(`/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImageUrl(res.data.imageUrl);
            setUploadSuccess(true);
        } catch (error) {
            fileInputRef.current.value = ''; // Reset file input
            setPreview(null); // Clear preview
            setUploadSuccess(false);
            setUploadError(true);
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
            setLoading(false);
        }

    };

    useEffect(() => {
        setUploadError(false);
        setUploadSuccess(false);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

    }, [resetTrigger]);

    return (
        <div className={`flex ${center ? 'items-center' : ''} flex-col gap-2 mb-3`}>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={status || uploading}
                ref={fileInputRef}
                className="w-full max-w-md text-white bg-[#10214b] border border-[#90E0EF]/30 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#d7bd88] file:text-[#0D1B2A] file:font-semibold file:text-sm hover:file:bg-[#c4ab70] transition-all duration-300"
                required
            />
            {preview && showPreview && uploadSuccess && (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#d7bd88]"
                />
            )}

            {uploading && (
                <p className="text-center text-[#10214b] text-md mt-2">Uploading image...</p>
            )}

            {uploadError && (
                <p className="text-center text-red-500 text-md mt-2">Failed to upload image</p>
            )}


        </div>
    );
};