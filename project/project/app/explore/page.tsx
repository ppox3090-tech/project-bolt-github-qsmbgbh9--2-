'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import PageHeader from '@/components/PageHeader';
import CategoryBadge, { type Category, CATEGORY_LABELS, CATEGORY_STYLES } from '@/components/CategoryBadge';

// ---------- Types ----------
type Profile = {
  id: string;
  username: string;
  email: string | null;
  age: number | null;
  latitude: number | null;
  longitude: number | null;
  category: Category;
  description: string | null;
  created_at: string;
};

type FormState = {
  username: string;
  email: string;
  age: string;
  latitude: string;
  longitude: string; 
  category: Category;
  description: string;
};

// ---------- Constants ----------
const EMPTY_FORM: FormState = {
  username: '',
  email: '',
  age: '',
  latitude: '',
  longitude: '',
  category: 'restaurant',
  description: '',
};

const FILTER_OPTIONS: { value: 'all' | Category; label: string }[] = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'restaurant', label: CATEGORY_LABELS.restaurant },
  { value: 'cafe', label: CATEGORY_LABELS.cafe },
  { value: 'tourist_spot', label: CATEGORY_LABELS.tourist_spot },
];

// ---------- Page Component ----------
export default function ExplorePage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);
  const [deleting, setDeleting] = useState(false);

  // search + filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Category>('all');

  // ---------- Fetch profiles ----------
  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, email, age, latitude, longitude, category, description, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
      setProfiles([]);
    } else {
      setProfiles(data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  // ---------- Filtered profiles ----------
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [profiles, categoryFilter, searchQuery]);

  // ---------- Form handlers ----------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormError(null);
  };

  const handleEdit = (profile: Profile) => {
    setEditingId(profile.id);
    setForm({
      username: profile.username,
      email: profile.email ?? '',
      age: profile.age?.toString() ?? '',
      latitude: profile.latitude?.toString() ?? '',
      longitude: profile.longitude?.toString() ?? '',
      category: profile.category,
      description: profile.description ?? '',
    });
    setFormError(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    if (!form.username.trim()) {
      setFormError('กรุณากรอกชื่อสถานที่');
      setSaving(false);
      return;
    }

    const payload = {
      username: form.username.trim(),
      email: form.email.trim() || null,
      age: form.age ? parseInt(form.age, 10) : null,
      latitude: form.latitude ? parseFloat(form.latitude) : null,
      longitude: form.longitude ? parseFloat(form.longitude) : null,
      category: form.category,
      description: form.description.trim() || null,
    };

    let result;
    if (editingId) {
      result = await supabase.from('profiles').update(payload).eq('id', editingId).select().single();
    } else {
      result = await supabase.from('profiles').insert(payload).select().single();
    }

    if (result.error) {
      setFormError(result.error.message);
      setSaving(false);
      return;
    }

    resetForm();
    setSaving(false);
    fetchProfiles();
  };

  // ---------- Delete handlers ----------
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    const { error } = await supabase.from('profiles').delete().eq('id', deleteTarget.id);

    if (error) {
      setFormError(error.message);
      setDeleting(false);
      setDeleteTarget(null);
      return;
    }

    setDeleting(false);
    setDeleteTarget(null);
    fetchProfiles();
  };

  // ---------- Render ----------
  return (
    <main className="min-h-screen bg-stone-50">
      <PageHeader title="จัดการข้อมูลสถานที่" />

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Form Section */}
        <section className="mb-8">
          <div className="card p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                {editingId ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  {editingId ? 'แก้ไขข้อมูล' : 'เพิ่มสถานที่ใหม่'}
                </h2>
                <p className="text-sm text-stone-500">
                  {editingId ? 'แก้ไขข้อมูลแล้วกดบันทึก' : 'กรอกข้อมูลสถานที่ที่ต้องการแนะนำ'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Group: Main info */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Username - full width */}
                <div className="sm:col-span-2">
                  <label htmlFor="username" className="label-base">
                    ชื่อสถานที่ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleInputChange}
                    placeholder="เช่น ร้านข้าวซอยกว๊าน"
                    className="input-base"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="label-base">
                    ประเภท <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    className="input-base"
                  >
                    <option value="restaurant">ร้านอาหาร</option>
                    <option value="cafe">คาเฟ่</option>
                    <option value="tourist_spot">สถานที่ท่องเที่ยว</option>
                  </select>
                </div>

                {/* Age */}
                <div>
                  <label htmlFor="age" className="label-base">
                    อายุ (ปี)
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="0"
                    value={form.age}
                    onChange={handleInputChange}
                    placeholder="เช่น 5"
                    className="input-base"
                  />
                </div>

                {/* Description - full width */}
                <div className="sm:col-span-2">
                  <label htmlFor="description" className="label-base">
                    รายละเอียด
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="คำอธิบายสั้นๆ เกี่ยวกับสถานที่"
                    className="input-base"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-stone-100" />

              {/* Group: Contact + Location */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="label-base">
                    อีเมล
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="input-base"
                  />
                </div>

                <div>
                  <label htmlFor="latitude" className="label-base">
                    ละติจูด (Latitude)
                  </label>
                  <input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    value={form.latitude}
                    onChange={handleInputChange}
                    placeholder="เช่น 19.1678"
                    className="input-base"
                  />
                </div>
                <div>
                  <label htmlFor="longitude" className="label-base">
                     ลองจิจูด (Longitude)
                  </label>
                  <input
                     id="longitude"
                     name="longitude"
                     type="number"
                     step="any"
                     value={form.longitude}
                     onChange={handleInputChange}
                     placeholder="เช่น 99.8821"
                     className="input-base"
                  />
                </div>
              </div>

              {/* Form error */}
              {formError && (
                <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200/80">
                  {formError}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      กำลังบันทึก...
                    </>
                  ) : editingId ? (
                    'บันทึกการแก้ไข'
                  ) : (
                    'เพิ่มข้อมูล'
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary"
                  >
                    ยกเลิก
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Table Section */}
        <section>
          {/* Search + Filter bar */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-stone-900">รายการสถานที่</h2>
            {!loading && !error && (
              <span className="text-sm text-stone-500">
                {filteredProfiles.length !== profiles.length
                  ? `${filteredProfiles.length} จาก ${profiles.length} รายการ`
                  : `ทั้งหมด ${profiles.length} รายการ`}
              </span>
            )}
          </div>

          {/* Filter controls */}
          {!loading && !error && profiles.length > 0 && (
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
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
                  placeholder="ค้นหาจากชื่อหรือรายละเอียด..."
                  className="input-base pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setCategoryFilter(opt.value)}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                      categoryFilter === opt.value
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'border border-stone-300 bg-white text-stone-600 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="card p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="mt-4 text-lg font-semibold text-rose-800">ไม่สามารถโหลดข้อมูลได้</p>
              <p className="mt-2 break-words text-sm text-rose-600">{error}</p>
              <button onClick={fetchProfiles} className="btn-danger mt-6">
                ลองโหลดใหม่
              </button>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="card overflow-hidden">
              <div className="animate-pulse">
                <div className="border-b border-stone-200 bg-stone-50 px-6 py-4">
                  <div className="flex gap-8">
                    {[40, 30, 20, 30].map((w, i) => (
                      <div key={i} className="h-4 rounded bg-stone-200" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-stone-100 px-6 py-5">
                    <div className="flex gap-8">
                      <div className="h-4 w-40 rounded bg-stone-200" />
                      <div className="h-4 w-28 rounded bg-stone-100" />
                      <div className="h-4 w-16 rounded bg-stone-100" />
                      <div className="h-4 w-24 rounded bg-stone-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state - no data at all */}
          {!loading && !error && profiles.length === 0 && (
            <div className="card p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="mt-4 text-stone-500">ยังไม่มีข้อมูลในระบบ</p>
            </div>
          )}

          {/* Empty state - no search results */}
          {!loading && !error && profiles.length > 0 && filteredProfiles.length === 0 && (
            <div className="card p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="mt-4 text-stone-500">ไม่พบสถานที่ที่ตรงกับการค้นหา</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
                className="mt-4 text-sm font-medium text-teal-600 hover:text-teal-700"
              >
                ล้างตัวกรอง
              </button>
            </div>
          )}

          {/* Data table */}
          {!loading && !error && filteredProfiles.length > 0 && (
            <div className="card overflow-hidden">
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50/80">
                      <th className="px-6 py-3.5 font-semibold text-stone-700">ชื่อสถานที่</th>
                      <th className="px-6 py-3.5 font-semibold text-stone-700">อีเมล</th>
                      <th className="px-6 py-3.5 font-semibold text-stone-700">อายุ</th>
                      <th className="px-6 py-3.5 font-semibold text-stone-700">ละติจูด</th>
                      <th className="px-6 py-3.5 font-semibold text-stone-700">ประเภท</th>
                      <th className="px-6 py-3.5 text-right font-semibold text-stone-700">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProfiles.map((profile) => (
                      <tr
                        key={profile.id}
                        className="border-b border-stone-100 transition-colors last:border-0 hover:bg-stone-50/60"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-stone-900">{profile.username}</div>
                          {profile.description && (
                            <div className="mt-0.5 text-xs text-stone-500 line-clamp-1">{profile.description}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-stone-600">{profile.email || '-'}</td>
                        <td className="px-6 py-4 text-stone-600">{profile.age ?? '-'}</td>
                        <td className="px-6 py-4 text-stone-600">
                          {profile.latitude != null ? profile.latitude.toFixed(4) : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <CategoryBadge category={profile.category} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(profile)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              แก้ไข
                            </button>
                            <button
                              onClick={() => setDeleteTarget(profile)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              ลบ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-stone-100 md:hidden">
                {filteredProfiles.map((profile) => (
                  <div key={profile.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-stone-900">{profile.username}</p>
                        {profile.description && (
                          <p className="mt-0.5 text-xs text-stone-500 line-clamp-2">{profile.description}</p>
                        )}
                      </div>
                      <CategoryBadge category={profile.category} />
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-stone-500">
                      <span>{profile.email || 'ไม่มีอีเมล'}</span>
                      <span>อายุ {profile.age ?? '-'} ปี</span>
                      {profile.latitude != null && <span>ละติจูด {profile.latitude.toFixed(2)}</span>}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(profile)}
                        className="flex-1 rounded-lg border border-stone-300 py-2 text-xs font-medium text-stone-600 transition-colors hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => setDeleteTarget(profile)}
                        className="flex-1 rounded-lg border border-stone-300 py-2 text-xs font-medium text-stone-600 transition-colors hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-900">ยืนยันการลบ</h3>
                <p className="mt-1 text-sm text-stone-500">การกระทำนี้ไม่สามารถย้อนกลับได้</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-stone-50 px-4 py-3">
              <p className="text-sm text-stone-600">
                คุณต้องการลบ <span className="font-semibold text-stone-900">{deleteTarget.username}</span> ใช่หรือไม่?
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="btn-danger flex-1"
              >
                {deleting ? 'กำลังลบ...' : 'ยืนยันลบ'}
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="btn-secondary flex-1"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
