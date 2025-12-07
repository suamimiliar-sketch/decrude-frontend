import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎄</span>
            <h1 className="text-2xl font-bold text-red-600">DECRUDE</h1>
          </div>
          <Link
            href="/upload"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Buat Foto Sekarang
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Foto Keluarga Natal AI
        </h2>
        <p className="text-2xl text-gray-600 mb-2">
          Hemat <span className="text-red-600 font-bold">IDR 2 Juta</span> dari fotografer!
        </p>
        <p className="text-xl text-gray-500 mb-8">
          Hasil profesional dalam 10 menit ⚡
        </p>
        <Link
          href="/upload"
          className="inline-block bg-red-600 text-white text-xl px-12 py-4 rounded-lg hover:bg-red-700 shadow-lg"
        >
          Buat Foto Natal Sekarang →
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          ⏰ Deadline kartu Natal: <strong>15 Desember</strong>
        </p>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">
          Harga Spesial Natal 🎁
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-4">Basic</h4>
            <p className="text-4xl font-bold text-red-600 mb-4">IDR 49K</p>
            <ul className="space-y-2 mb-6">
              <li>✅ 1 tema pilihan</li>
              <li>✅ 5 format download</li>
              <li>✅ Download selamanya</li>
            </ul>
            <Link
              href="/upload"
              className="block w-full bg-gray-200 text-center py-3 rounded-lg hover:bg-gray-300"
            >
              Pilih Basic
            </Link>
          </div>

          <div className="bg-red-600 text-white p-8 rounded-lg shadow-xl transform scale-105">
            <div className="bg-yellow-400 text-xs px-3 py-1 rounded-full inline-block mb-2 text-red-600">
              POPULER
            </div>
            <h4 className="text-xl font-bold mb-4">Premium</h4>
            <p className="text-4xl font-bold mb-4">IDR 79K</p>
            <ul className="space-y-2 mb-6">
              <li>✅ 3 tema pilihan</li>
              <li>✅ 15 file total</li>
              <li>✅ Revisi gratis 1x</li>
            </ul>
            <Link
              href="/upload"
              className="block w-full bg-white text-red-600 text-center py-3 rounded-lg hover:bg-gray-100 font-bold"
            >
              Pilih Premium
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-4">Family Pack</h4>
            <p className="text-4xl font-bold text-red-600 mb-4">IDR 99K</p>
            <ul className="space-y-2 mb-6">
              <li>✅ SEMUA 12 tema</li>
              <li>✅ 60 file total</li>
              <li>✅ Revisi unlimited</li>
            </ul>
            <Link
              href="/upload"
              className="block w-full bg-gray-200 text-center py-3 rounded-lg hover:bg-gray-300"
            >
              Pilih Family
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 DECRUDE. Dibuat dengan ❤️ untuk keluarga Indonesia.</p>
        </div>
      </footer>
    </main>
  );
}