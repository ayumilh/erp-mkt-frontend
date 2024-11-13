import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Total de Vendas', value: 100 },
  { name: 'Novos', value: 25 },
  { name: 'Em Andamento', value: 50 },
  { name: 'Cancelados', value: 25 }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const ChartPie2 = () => {
  return (
    <PieChart width={400} height={200}>
      <Pie
        data={data}
        cx={100}
        cy={100}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="vertical" verticalAlign="middle" align="right" />
    </PieChart>
  );
};

export default ChartPie2;