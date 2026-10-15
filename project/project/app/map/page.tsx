'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import PageHeader from '@/components/PageHeader';
import { type Category, CATEGORY_LABELS } from '@/components/CategoryBadge';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-stone-100" />,
});

type Profile = {
  id: string;
  username: string;
  email: string | null;
  latitude: number | null;
  longitude: number | null;
  category: Category;
  description: string | null;
};

const CATEGORY_COLORS: Record<Category, string> = {
  restaurant: '#f43f5e',
  cafe: '#f59e0b',
  tourist_spot: '#0d9488',
};

// Phayao Lake center
const MAP_CENTER = { lat: 19.1702, lng: 99.8821 };

const FILTER_OPTIONS: { value: 'all' | Category; label: string }[] = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'restaurant', label: CATEGORY_LABELS.restaurant },
  { value: 'cafe', label: CATEGORY_LABELS.cafe },
  { value: 'tourist_spot', label: CATEGORY_LABELS.tourist_spot },
];

export default function MapPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Profile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Category>('all');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, email, latitude, longitude, category, description')
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

  const placesWithCoords = profiles.filter(
    (p) => p.latitude != null && p.longitude != null
  );

  const filteredPlaces = useMemo(() => {
    return placesWithCoords.filter((p) => {
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [placesWithCoords, categoryFilter, searchQuery]);

  

  return (
    <main className="min-h-screen bg-stone-50">
      <PageHeader title="แผนที่สถานที่" />

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
          <div className="card animate-pulse p-8">
            <div className="h-96 rounded-xl bg-stone-100" />
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stats bar + Legend */}
            <div className="mb-6 flex flex-col gap-3 rounded-xl border border-stone-200/80 bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-stone-700">
                สถานที่ที่มีพิกัด: <span className="font-bold text-stone-900">{placesWithCoords.length}</span> จาก {profiles.length} รายการ
              </span>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => {
                  const count = placesWithCoords.filter((p) => p.category === cat).length;
                  return (
                    <span key={cat} className="inline-flex items-center gap-1.5 text-xs text-stone-600">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                      />
                      {CATEGORY_LABELS[cat]} ({count})
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Map + Sidebar */}
            <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
              {/* Map */}
              <div className="relative z-0 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
                <div className="h-[480px] w-full lg:h-[600px]">
                 <LeafletMap
                  places={filteredPlaces.map((p) => ({
                     id: p.id,
                     username: p.username,
                     latitude: p.latitude!,
                     longitude: p.longitude!,
                     category: p.category,
                  }))}
                  selectedId={selected?.id ?? null}
                  onSelect={(id) => setSelected(filteredPlaces.find((p) => p.id === id) ?? null)}
                  colors={CATEGORY_COLORS}
                  center={[MAP_CENTER.lat, MAP_CENTER.lng]}
                />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Selected place detail */}
                {selected && (
                  <div className="card p-5 animate-slide-up">
                    <div className="flex items-start justify-between">
                      <h3 className="text-base font-semibold text-stone-900">{selected.username}</h3>
                      <button
                        onClick={() => setSelected(null)}
                        className="text-stone-400 transition-colors hover:text-stone-600"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <span
                      className="mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: CATEGORY_COLORS[selected.category] }}
                    >
                      {CATEGORY_LABELS[selected.category]}
                    </span>
                    {selected.description && (
                      <p className="mt-3 text-sm leading-relaxed text-stone-600">{selected.description}</p>
                    )}
                    <dl className="mt-4 space-y-1.5 text-sm">
                      {selected.email && (
                        <div className="flex justify-between">
                          <dt className="font-medium text-stone-500">อีเมล</dt>
                          <dd className="text-stone-700">{selected.email}</dd>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <dt className="font-medium text-stone-500">ละติจูด</dt>
                        <dd className="text-stone-700">{selected.latitude?.toFixed(4)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-stone-500">ลองจิจูด</dt>
                        <dd className="text-stone-700">{selected.longitude?.toFixed(4)}</dd>
                      </div>
                    </dl>
                  </div>
                )}

                {/* Search + Filter */}
                <div className="card p-4">
                  <div className="relative mb-3">
                    <svg
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ค้นหาสถานที่..."
                      className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-9 pr-3 text-sm text-stone-900 transition-colors placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {FILTER_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setCategoryFilter(opt.value)}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                          categoryFilter === opt.value
                            ? 'bg-teal-600 text-white'
                            : 'border border-stone-300 bg-white text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Place list */}
                <div className="card p-5">
                  <h3 className="mb-3 text-sm font-semibold text-stone-900">รายการสถานที่</h3>
                  {filteredPlaces.length > 0 ? (
                    <div className="max-h-80 space-y-1.5 overflow-y-auto">
                      {filteredPlaces.map((place) => (
                        <button
                          key={place.id}
                          onClick={() => setSelected(place)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                            selected?.id === place.id ? 'bg-stone-100' : 'hover:bg-stone-50'
                          }`}
                        >
                          <span
                            className="h-3 w-3 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: CATEGORY_COLORS[place.category] }}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-stone-800">{place.username}</p>
                            <p className="text-xs text-stone-500">{CATEGORY_LABELS[place.category]}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-stone-500">
                      {placesWithCoords.length === 0
                        ? 'ยังไม่มีสถานที่ที่มีพิกัดในระบบ'
                        : 'ไม่พบสถานที่ที่ตรงกับการค้นหา'}
                    </p>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <Link
                    href="/explore"
                    className="flex-1 rounded-xl bg-teal-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-500"
                  >
                    จัดการข้อมูล
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-3 text-center text-sm font-medium text-stone-700 shadow-sm transition-all hover:bg-stone-50"
                  >
                    แดชบอร์ด
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
