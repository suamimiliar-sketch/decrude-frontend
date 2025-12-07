'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDF8F5]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-24 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-red-100 text-red-700 font-medium text-sm">
            🎄 Edisi Spesial Natal 2025
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Foto Natal Keluarga <br/>
            <span className="text-red-600">Cuma 10 Ribuan</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Gak perlu ke studio mahal. Upload foto HP, jadi foto profesional pakai baju Batik Natal dalam 5 menit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/upload"
              className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg shadow-red-200"
            >
              Buat Foto Sekarang →
            </Link>
          </div>
        </div>
      </div>

      {/* Pricing Section (The Core) */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pilih Paket Hemat 🏷️</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Paket 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg text-gray-900">Paket Coba</h3>
              <div className="my-4">
                <span className="text-4xl font-bold text-gray-900">Rp 10.000</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600 text-sm">
                <li className="flex gap-2">✅ <b>1 Foto</b> Hasil Jadi</li>
                <li className="flex gap-2">✅ Resolusi HD</li>
                <li className="flex gap-2">✅ Antrian Standar</li>
              </ul>
              <Link href="/upload?pkg=1" className="block w-full py-3 bg-gray-100 text-gray-900 font-bold text-center rounded-lg hover:bg-gray-200">
                Pilih Ini
              </Link>
            </div>

            {/* Paket 2 (Best Value) */}
            <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                PALING LARIS
              </div>
              <h3 className="font-bold text-lg text-red-700">Paket Seru</h3>
              <div className="my-4">
                <span className="text-4xl font-bold text-gray-900">Rp 15.000</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700 text-sm">
                <li className="flex gap-2">✅ <b>1 Foto</b> Hasil Jadi</li>
                <li className="flex gap-2">✅ <b>Resolusi Full HD</b></li>
                <li className="flex gap-2">⚡ <b>Prioritas Antrian (Cepat)</b></li>
              </ul>
              <Link href="/upload?pkg=2" className="block w-full py-3 bg-red-600 text-white font-bold text-center rounded-lg hover:bg-red-700">
                Pilih Ini
              </Link>
            </div>

            {/* Paket 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg text-gray-900">Paket Puas</h3>
              <div className="my-4">
                <span className="text-4xl font-bold text-gray-900">Rp 20.000</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-600 text-sm">
                <li className="flex gap-2">✅ <b>1 Foto</b> Hasil Jadi</li>
                <li className="flex gap-2">✅ <b>Resolusi 4K (Cetak)</b></li>
                <li className="flex gap-2">⚡ Prioritas Utama VIP</li>
              </ul>
              <Link href="/upload?pkg=3" className="block w-full py-3 bg-gray-100 text-gray-900 font-bold text-center rounded-lg hover:bg-gray-200">
                Pilih Ini
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simple How To */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">Caranya Gampang Banget</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">📸</div>
              <p className="font-medium">1. Upload Foto</p>
            </div>
            <div>
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🎨</div>
              <p className="font-medium">2. Pilih Tema</p>
            </div>
            <div>
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">✨</div>
              <p className="font-medium">3. Jadi Deh!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 text-center text-gray-400 text-sm">
        <p>© 2025 Decrude Indonesia. Aman & Terpercaya.</p>
      </footer>
    </main>
  );
}