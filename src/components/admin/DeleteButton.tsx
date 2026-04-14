'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DeleteButton({ table, id }: { table: string, id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить этот элемент?')) {
      return;
    }

    setIsDeleting(true);
    const { error } = await supabase.from(table).delete().eq('id', id);
    
    if (error) {
      alert('Ошибка при удалении: ' + error.message);
      setIsDeleting(false);
    } else {
      router.refresh(); // Refresh the server component to get new data
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Удалить"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
