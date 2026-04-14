'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUpload({ value, onChange, folder = 'partners', label = 'Logotip' }: ImageUploadProps) {
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Generate unique filename
    const ext = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, file, { upsert: true });

    if (error) {
      alert('Yuklashda xatolik: ' + error.message);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(data.path);
    const publicUrl = urlData.publicUrl;

    setPreview(publicUrl);
    onChange(publicUrl);
    setUploading(false);
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      {preview ? (
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-gray-200 overflow-hidden">
            <img src={preview} alt="Preview" className="w-16 h-16 object-contain" />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : null}

      <div className="mt-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {uploading ? 'Yuklanmoqda...' : 'Rasm yuklash'}
        </button>
      </div>

      {/* Manual URL input as fallback */}
      <div className="mt-3">
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setPreview(e.target.value); }}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none text-sm"
          placeholder="Yoki URL havolasini yozing..."
        />
      </div>
    </div>
  );
}
