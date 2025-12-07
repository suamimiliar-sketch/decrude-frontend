'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { themes } from '@/lib/themes';
import toast, { Toaster } from 'react-hot-toast';

function ThemeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedTheme) {
      toast.error('Pilih tema terlebih dahulu!');
      return;
    }
    router.push(`/checkout?orderId=${orderId}&themeId=${selectedTheme}`);
  };

  const getEmoji = (category: string) => {
    if (category === 'church') return '⛪';
    if (category === 'outdoor') return '🌴';
    if (category === 'indoor') return '🏠';
    return '🎭';
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 py-12">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Pilih Tema Natal 🎄
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`
                bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition transform hover:scale-105
                ${selectedTheme === theme.id ? 'ring-4 ring-red-600' : ''}
              `}
            >
              <div className="h-48 bg-gradient-to-br from-red-100 to-green-100 flex items-center justify-center">
                <span className="text-6xl">{getEmoji(theme.category)}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{theme.name}</h3>
                {selectedTheme === theme.id && (
                  <div className="mt-2 text-red-600 font-semibold text-sm">
                    ✓ Dipilih
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedTheme}
            className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 disabled:bg-gray-300 text-lg font-semibold"
          >
            Lanjut ke Pembayaran →
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ThemePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-green-50">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎄</div>
            <h2 className="text-2xl font-bold mb-2">
              Membuka halaman tema...
            </h2>
          </div>
        </main>
      }
    >
      <ThemeContent />
    </Suspense>
  );
}
