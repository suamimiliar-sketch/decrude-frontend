'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Script from 'next/script';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const themeId = searchParams.get('themeId');

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packageTier: 'basic',
  });

  const prices = {
    basic: 49000,
    premium: 79000,
    family: 99000,
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Nama dan email wajib diisi!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/create`,
        {
          name: formData.name,
          email: formData.email,
          packageTier: formData.packageTier,
        },
      );

      const { snapToken, orderId: newOrderId } = response.data;

      // @ts-ignore
      window.snap.pay(snapToken, {
        onSuccess: () => {
          toast.success('Pembayaran berhasil!');

          // Trigger generation
          axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/generation/generate`,
            { orderId: newOrderId, themeId },
          );

          window.location.href = `/download?orderId=${newOrderId}`;
        },
        onPending: () => {
          toast.success('Menunggu pembayaran...');
        },
        onError: () => {
          toast.error('Pembayaran gagal!');
        },
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Checkout gagal!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 py-12">
        <Toaster position="top-center" />
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Checkout 💳</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Data Pemesan</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nama *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="+62 812-3456-7890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Paket
                  </label>
                  <select
                    value={formData.packageTier}
                    onChange={(e) =>
                      setFormData({ ...formData, packageTier: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2"
                  >
                    <option value="basic">Basic - IDR 49K</option>
                    <option value="premium">Premium - IDR 79K</option>
                    <option value="family">Family - IDR 99K</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Ringkasan</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Paket:</span>
                  <span className="font-semibold capitalize">
                    {formData.packageTier}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-red-600">
                    IDR{' '}
                    {prices[
                      formData.packageTier as keyof typeof prices
                    ].toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 disabled:bg-gray-300 text-lg font-semibold"
              >
                {loading ? 'Memproses...' : 'Bayar Sekarang'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          Loading checkout...
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
