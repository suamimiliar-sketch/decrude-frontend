'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function DownloadPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [status, setStatus] = useState('processing');
  const [generatedPhotos, setGeneratedPhotos] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/orders/${orderId}`,
        );
        const order = response.data;

        if (order.generated_photos && order.generated_photos.length > 0) {
          const completed = order.generated_photos.every(
            (p: any) => p.status === 'completed',
          );

          if (completed) {
            setStatus('completed');
            setGeneratedPhotos(order.generated_photos);
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (status === 'processing') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎄</div>
          <h2 className="text-2xl font-bold mb-2">
            Sedang Membuat Foto Natal...
          </h2>
          <p className="text-gray-600">Estimasi: 5-10 menit</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Foto Natal Anda Siap! 🎉
        </h1>

        {generatedPhotos.map((photo, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="font-semibold text-lg mb-4">
              Tema: {photo.theme_id}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href={photo.cloudinary_url_4k}
                download
                className="bg-red-600 text-white text-center py-3 rounded-lg hover:bg-red-700"
              >
                📥 4K Print
              </a>
              <a
                href={photo.cloudinary_url_instagram}
                download
                className="bg-pink-500 text-white text-center py-3 rounded-lg hover:bg-pink-600"
              >
                📥 Instagram
              </a>
              <a
                href={photo.cloudinary_url_facebook}
                download
                className="bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600"
              >
                📥 Facebook
              </a>
              <a
                href={photo.cloudinary_url_whatsapp}
                download
                className="bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600"
              >
                📥 WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}