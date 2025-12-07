'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function UploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [orderId, setOrderId] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviews(newPreviews);
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Pilih minimal 1 foto!');
      return;
    }

    setUploading(true);

    try {
      // Create temporary order ID
      const tempOrderId = crypto.randomUUID();
      setOrderId(tempOrderId);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('photos', file);
      });
      formData.append('orderId', tempOrderId);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/photos`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      toast.success('Upload berhasil!');
      router.push(`/theme?orderId=${tempOrderId}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload gagal!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 py-12">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Upload Foto Keluarga 📸
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div
            {...getRootProps()}
            className="border-4 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-red-600"
          >
            <input {...getInputProps()} />
            <p className="text-6xl mb-4">📤</p>
            <p className="text-xl text-gray-700 mb-2">
              Klik atau drag foto ke sini
            </p>
            <p className="text-sm text-gray-500">
              Format: JPG, PNG | Max: 5 foto
            </p>
          </div>

          {previews.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold mb-4">
                Foto ({files.length}/5):
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {previews.map((preview, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        const newFiles = files.filter((_, i) => i !== idx);
                        const newPreviews = previews.filter((_, i) => i !== idx);
                        setFiles(newFiles);
                        setPreviews(newPreviews);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="w-full mt-8 bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 disabled:bg-gray-300 text-lg font-semibold"
          >
            {uploading ? 'Mengupload...' : 'Lanjut Pilih Tema →'}
          </button>
        </div>
      </div>
    </main>
  );
}