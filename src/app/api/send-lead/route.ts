import { NextResponse } from 'next/server';
import { z } from 'zod';

// Zod validation schema
const leadSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(9, 'Укажите корректный номер телефона'),
  machine: z.string().optional(),
  message: z.string().optional(),
  leasingData: z.object({
    machinePrice: z.number(),
    downPaymentPercent: z.number(),
    downPaymentAmount: z.number(),
    leaseTerm: z.number(),
    interestRate: z.number(),
    monthlyPayment: z.number(),
    totalPayment: z.number(),
  }).optional(),
});

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

function formatNumber(num: number): string {
  return new Intl.NumberFormat('uz-UZ').format(Math.round(num));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validation = leadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Ошибка валидации', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { name, phone, machine, message, leasingData } = validation.data;

    // Build Telegram message with HTML formatting
    let telegramMessage = `
<b>🔴 Новая заявка — SANY Uzbekistan</b>
━━━━━━━━━━━━━━━━━━

<b>👤 Имя:</b> ${name}
<b>📞 Телефон:</b> ${phone}`;

    if (machine) {
      telegramMessage += `\n<b>🚜 Техника:</b> ${machine}`;
    }

    if (message) {
      telegramMessage += `\n<b>💬 Сообщение:</b> ${message}`;
    }

    if (leasingData) {
      telegramMessage += `

<b>📊 Расчёт лизинга:</b>
├ Стоимость: ${formatNumber(leasingData.machinePrice)} сум
├ Первый взнос: ${leasingData.downPaymentPercent}% (${formatNumber(leasingData.downPaymentAmount)} сум)
├ Срок: ${leasingData.leaseTerm} мес.
├ Ставка: ${leasingData.interestRate}%
├ <b>Ежемесячный платёж: ${formatNumber(leasingData.monthlyPayment)} сум</b>
└ Общая выплата: ${formatNumber(leasingData.totalPayment)} сум`;
    }

    telegramMessage += `

<i>⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}</i>`;

    // Send to Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML',
          }),
        }
      );

      if (!telegramResponse.ok) {
        console.error('Telegram API Error:', await telegramResponse.text());
        // Don't fail the request even if Telegram fails
      }
    } else {
      console.log('Telegram not configured. Lead received:', { name, phone, machine });
    }

    return NextResponse.json({ success: true, message: 'Заявка успешно отправлена' });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
