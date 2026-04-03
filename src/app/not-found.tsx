'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-heading font-black text-sany-red/10 leading-none">404</h1>
          <div className="relative -mt-16 sm:-mt-20">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Страница не найдена
            </h2>
            <p className="text-text-muted mb-10 text-lg">
              Извините, запрашиваемая вами страница не существует или была перенесена.
            </p>
            <Link 
              href="/" 
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Вернуться на главную</span>
            </Link>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sany-red/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sany-red/5 rounded-full blur-3xl -z-10" />
      </div>
    </div>
  );
}
