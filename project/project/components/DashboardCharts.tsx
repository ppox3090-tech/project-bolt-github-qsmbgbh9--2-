'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// ต้องลงทะเบียนส่วนประกอบที่ใช้ ไม่เช่นนั้นกราฟจะไม่แสดง
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

type Props = {
  categoryLabels: string[];
  categoryCounts: number[];
  categoryColors: string[];
  dateLabels: string[];
  dateCounts: number[];
};

export default function DashboardCharts({
  categoryLabels,
  categoryCounts,
  categoryColors,
  dateLabels,
  dateCounts,
}: Props) {
  const baseOptions = { responsive: true, maintainAspectRatio: false };

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-2">
      {/* กราฟแท่ง */}
      <div className="card p-6">
        <h2 className="text-base font-semibold text-stone-900">กราฟแท่ง: จำนวนสถานที่ตามประเภท</h2>
        <div className="mt-4 h-64">
          <Bar
            data={{
              labels: categoryLabels,
              datasets: [
                {
                  label: 'จำนวน (รายการ)',
                  data: categoryCounts,
                  backgroundColor: categoryColors,
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              ...baseOptions,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
            }}
          />
        </div>
      </div>

      {/* กราฟพาย */}
      <div className="card p-6">
        <h2 className="text-base font-semibold text-stone-900">กราฟพาย: สัดส่วนตามประเภท</h2>
        <div className="mt-4 h-64">
          <Pie
            data={{
              labels: categoryLabels,
              datasets: [
                {
                  data: categoryCounts,
                  backgroundColor: categoryColors,
                  borderColor: '#ffffff',
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              ...baseOptions,
              plugins: { legend: { position: 'bottom' } },
            }}
          />
        </div>
      </div>

      {/* กราฟเส้น */}
      <div className="card p-6 lg:col-span-2">
        <h2 className="text-base font-semibold text-stone-900">กราฟเส้น: จำนวนสถานที่ที่เพิ่มในแต่ละวัน</h2>
        <div className="mt-4 h-64">
          <Line
            data={{
              labels: dateLabels,
              datasets: [
                {
                  label: 'เพิ่มใหม่ (รายการ)',
                  data: dateCounts,
                  borderColor: '#0d9488',
                  backgroundColor: 'rgba(13, 148, 136, 0.15)',
                  fill: true,
                  tension: 0.3,
                  pointRadius: 4,
                },
              ],
            }}
            options={{
              ...baseOptions,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
            }}
          />
        </div>
      </div>
    </div>
  );
}