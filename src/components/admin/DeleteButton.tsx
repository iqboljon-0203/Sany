'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useToast } from './ToastProvider';

export default function DeleteButton({ table, id }: { table: string, id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить этот элемент?')) {
      return;
    }

    setIsDeleting(true);
    const { error } = await supabase.from(table).delete().eq('id', id);
    
    if (error) {
      toast('Xatolik: ' + error.message, 'error');
      setIsDeleting(false);
    } else {
      toast('Muvaffaqiyatli o\'chirildi', 'success');
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
