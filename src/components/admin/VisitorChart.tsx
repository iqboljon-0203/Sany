'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Пн', visitors: 110, pageviews: 240 },
  { name: 'Вт', visitors: 145, pageviews: 310 },
  { name: 'Ср', visitors: 120, pageviews: 280 },
  { name: 'Чт', visitors: 200, pageviews: 450 },
  { name: 'Пт', visitors: 180, pageviews: 380 },
  { name: 'Сб', visitors: 250, pageviews: 520 },
  { name: 'Вс', visitors: 190, pageviews: 410 },
];

export default function VisitorChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#BE111A" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#BE111A" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
          />
          <Area 
            type="monotone" 
            dataKey="visitors" 
            name="Посетители (Уник.)" 
            stroke="#BE111A" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorVisitors)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
