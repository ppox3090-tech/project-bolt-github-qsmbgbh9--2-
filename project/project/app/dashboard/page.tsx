'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import PageHeader from '@/components/PageHeader';
import CategoryBadge, { type Category, CATEGORY_LABELS } from '@/components/CategoryBadge';
import DashboardCharts from '@/components/DashboardCharts';

type Profile = {
  id: string;
  username: string;
  category: Category;
  age: number | null;
  created_at: string;
};

type CategoryStat = {
  category: Category;
  label: string;
  count: number;
  color: string;
  bgColor: string;
  barColor: string;
  icon: React.ReactNode;
};

const CHART_COLORS: Record<Category, string> = {
  restaurant: '#f43f5e',
  cafe: '#f59e0b',
  tourist_spot: '#0d9488',
};

export default function DashboardPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, category, age, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        setProfiles([]);
      } else {
        setProfiles(data ?? []);
      }

      setLoading(false);
    })();
  }, []);

  const totalCount = profiles.length;

  const categoryStats: CategoryStat[] = [
    {
      category: 'restaurant',
      label: CATEGORY_LABELS.restaurant,
      count: profiles.filter((p) => p.category === 'restaurant').length,
      color: 'text-rose-700',
      bgColor: 'bg-rose-50',
      barColor: 'bg-rose-400',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      ),
    },
    {
      category: 'cafe',
      label: CATEGORY_LABELS.cafe,
      count: profiles.filter((p) => p.category === 'cafe').length,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      barColor: 'bg-amber-400',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
      ),
    },
    {
      category: 'tourist_spot',
      label: CATEGORY_LABELS.tourist_spot,
      count: profiles.filter((p) => p.category === 'tourist_spot').length,
      color: 'text-teal-700',
      bgColor: 'bg-teal-50',
      barColor: 'bg-teal-400',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      ),
    },
  ];

  const avgAge =
    totalCount > 0
      ? (profiles.reduce((sum, p) => sum + (p.age ?? 0), 0) / totalCount).toFixed(1)
      : '0';

  const recentPlaces = profiles.slice(0, 5);

    // ข้อมูลกราฟแท่งและกราฟพาย
  const categoryLabels = categoryStats.map((s) => s.label);
  const categoryCounts = categoryStats.map((s) => s.count);
  const categoryColors = categoryStats.map((s) => CHART_COLORS[s.category]);

  // ข้อมูลกราฟเส้น: นับจำนวนที่เพิ่มในแต่ละวัน เรียงจากเก่าไปใหม่
  const countByDate: Record<string, number> = {};
  profiles.forEach((p) => {
    const day = p.created_at.slice(0, 10); // รูปแบบ YYYY-MM-DD
    countByDate[day] = (countByDate[day] ?? 0) + 1;
  });
  const sortedDays = Object.keys(countByDate).sort();
  const dateLabels = sortedDays.map((d) =>
    new Date(d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
  );
  const dateCounts = sortedDays.map((d) => countByDate[d]);

  return (
    <main className="min-h-screen bg-stone-50">
      <PageHeader title="แดชบอร์ด" />

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Error state */}
        {error && (
          <div className="card p-8 text-center animate-slide-up">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="mt-4 text-lg font-semibold text-rose-800">ไม่สามารถโหลดข้อมูลได้</p>
            <p className="mt-2 break-words text-sm text-rose-600">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse p-6">
                <div className="h-4 w-24 rounded bg-stone-200" />
                <div className="mt-4 h-10 w-16 rounded bg-stone-100" />
              </div>
            ))}
          </div>
        )}

        {/* Dashboard content */}
        {!loading && !error && (
          <>
            {/* Summary cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
              {/* Total */}
              <div className="card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-stone-500">สถานที่ทั้งหมด</span>
                </div>
                <p className="mt-4 text-3xl font-bold text-stone-900">{totalCount}</p>
                <p className="mt-1 text-xs text-stone-400">รายการ</p>
              </div>

              {categoryStats.map((stat) => (
                <div key={stat.category} className="card p-6">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor} ${stat.color}`}>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {stat.icon}
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-stone-500">{stat.label}</span>
                  </div>
                  <p className={`mt-4 text-3xl font-bold ${stat.color}`}>{stat.count}</p>
                  <p className="mt-1 text-xs text-stone-400">รายการ</p>
                </div>
              ))}
            </div>

            {/* Distribution + Additional stats */}
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {/* Category distribution bar */}
              <div className="card p-6 lg:col-span-2">
                <h2 className="text-base font-semibold text-stone-900">สัดส่วนตามประเภท</h2>
                {totalCount > 0 ? (
                  <div className="mt-5 space-y-4">
                    {categoryStats.map((stat) => {
                      const percentage = totalCount > 0 ? (stat.count / totalCount) * 100 : 0;
                      return (
                        <div key={stat.category}>
                          <div className="mb-1.5 flex items-center justify-between text-sm">
                            <span className="font-medium text-stone-700">{stat.label}</span>
                            <span className="text-stone-500">
                              {stat.count} รายการ · {percentage.toFixed(0)}%
                            </span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-stone-100">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${stat.barColor}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-stone-500">ยังไม่มีข้อมูลในระบบ</p>
                )}
              </div>

              {/* Additional stats */}
              <div className="space-y-5">
                <div className="card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-stone-500">อายุเฉลี่ย</span>
                  </div>
                  <p className="mt-4 text-3xl font-bold text-stone-900">{avgAge}</p>
                  <p className="mt-1 text-xs text-stone-400">ปี</p>
                </div>

                <div className="card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-stone-500">มากที่สุด</span>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-stone-900">
                    {categoryStats.reduce((max, s) => (s.count > max.count ? s : max), categoryStats[0]).label}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">
                    {Math.max(...categoryStats.map((s) => s.count))} รายการ
                  </p>
                </div>
              </div>
            </div>

                        {/* Charts (Chart.js) */}
            {totalCount > 0 && (
              <DashboardCharts
                categoryLabels={categoryLabels}
                categoryCounts={categoryCounts}
                categoryColors={categoryColors}
                dateLabels={dateLabels}
                dateCounts={dateCounts}
              />
            )}

            {/* Recent places */}
            <div className="mt-6 card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-stone-900">สถานที่ล่าสุด</h2>
                <Link
                  href="/explore"
                  className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
                >
                  ดูทั้งหมด
                </Link>
              </div>
              {recentPlaces.length > 0 ? (
                <div className="divide-y divide-stone-100">
                  {recentPlaces.map((place) => (
                    <div key={place.id} className="flex items-center justify-between py-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-stone-900">{place.username}</p>
                        <p className="mt-0.5 text-xs text-stone-500">
                          {CATEGORY_LABELS[place.category]} · อายุ {place.age ?? '-'} ปี
                        </p>
                      </div>
                      <CategoryBadge category={place.category} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-sm text-stone-500">ยังไม่มีข้อมูลในระบบ</p>
              )}
            </div>

            {/* Navigation links */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/explore" className="btn-primary">
                จัดการข้อมูล
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/map" className="btn-secondary">
                ดูแผนที่สถานที่
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
