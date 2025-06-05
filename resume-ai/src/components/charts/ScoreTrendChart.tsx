'use client';
import { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'chart.js';
import useScoreTrend from '@/hooks/useScoreTrend';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

export default function ScoreTrendChart({ userId }: { userId: string }) {
  const { data, loading } = useScoreTrend(userId);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;
    const ctx = chart.ctx as CanvasRenderingContext2D;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#4ade80');
    gradient.addColorStop(1, '#16a34a');
    chart.data.datasets[0].borderColor = gradient;
    chart.update();
  }, [loading]);

  if (loading) {
    return <div className="h-32 animate-pulse rounded bg-zinc-800/60" />;
  }

  const labels = data.map(p =>
    new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  );
  const scores = data.map(p => p.score);

  return (
    <Line
      ref={chartRef}
      data={{
        labels,
        datasets: [
          {
            label: 'Score',
            data: scores,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#22c55e'
          }
        ]
      }}
      options={{
        responsive: true,
        aspectRatio: 3,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#52525b' } },
          y: {
            suggestedMin: 0,
            suggestedMax: 100,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#52525b' }
          }
        }
      }}
    />
  );
}
