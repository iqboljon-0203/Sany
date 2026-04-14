'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      if (rememberMe) {
        localStorage.setItem('adminEmail', email);
      } else {
        localStorage.removeItem('adminEmail');
      }
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-grey">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sany-red text-white mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">SANY Admin</h1>
          <p className="text-gray-500 mt-2">Boshqaruv paneliga kirish</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red focus:border-transparent outline-none transition-all"
              placeholder="admin@sany.uz"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-sany-red border-gray-300 rounded focus:ring-sany-red cursor-pointer"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer select-none">
              Eslab qolish
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Kirish...' : 'Kirish'}
          </button>
        </form>
      </div>
    </div>
  );
}
