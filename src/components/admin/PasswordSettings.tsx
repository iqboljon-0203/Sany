'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, KeyRound } from 'lucide-react';

export default function PasswordSettings() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const supabase = createClient();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Пароль должен содержать минимум 6 символов.' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Пароли не совпадают!' });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Пароль успешно обновлен!' });
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <KeyRound className="text-sany-red w-6 h-6" />
        <h3 className="text-xl font-bold text-gray-900">Смена пароля</h3>
      </div>
      <div className="p-6">
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Новый пароль</label>
            <input 
              type="password" 
              placeholder="Минимум 6 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Подтвердите пароль</label>
            <input 
              type="password" 
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Сохранение...' : 'Сохранить пароль'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
