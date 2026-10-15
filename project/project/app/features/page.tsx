import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <PageHeader title="ฟีเจอร์ของระบบ" />

      {/* Hero */}
      <section className="border-b border-stone-200/80 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            ฟีเจอร์ของระบบ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            ทุกอย่างที่ต้องการสำหรับการจัดการข้อมูลสถานที่
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-600">
            เพิ่ม แก้ไข ลบ และดูข้อมูลร้านอาหาร คาเฟ่ และสถานที่ท่องเที่ยวได้ในที่เดียว
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Card 1 */}
            <div className="group rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-stone-900">จัดการข้อมูลครบทุกฟังก์ชัน</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                เพิ่ม แก้ไข ลบ และดูข้อมูลร้านอาหาร คาเฟ่ และสถานที่ท่องเที่ยวได้ในที่เดียว
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-stone-900">จัดหมวดหมู่ตามประเภท</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                แบ่งสถานที่เป็นร้านอาหาร คาเฟ่ และสถานที่ท่องเที่ยว เพื่อค้นหาได้ง่าย
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition-colors group-hover:bg-rose-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-stone-900">พิกัดตำแหน่งที่ตั้ง</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                บันทึกละติจูดของแต่ละสถานที่เพื่อระบุตำแหน่งรอบกว๊านพะเยา
              </p>
            </div>
          </div>

          {/* Additional features */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="group rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-stone-900">แดชบอร์ดสรุปข้อมูล</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                ดูสถิติและข้อมูลสรุปของสถานที่ทั้งหมด แยกตามประเภท ในหน้า Dashboard
              </p>
              <Link
                href="/dashboard"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sky-600 transition-colors hover:text-sky-700"
              >
                ไปยังแดชบอร์ด
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="group rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-stone-900">แผนที่ตำแหน่งสถานที่</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                แสดงตำแหน่งสถานที่ทั้งหมดบนแผนที่ โดยใช้พิกัดละติจูดและลองจิจูด
              </p>
              <Link
                href="/map"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
              >
                ดูแผนที่
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 px-8 py-12 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-white">พร้อมเริ่มจัดการข้อมูลแล้วหรือยัง?</h3>
            <p className="mx-auto mt-3 max-w-xl text-teal-100">
              เพิ่ม แก้ไข และจัดการสถานที่ทั้งหมดได้ในหน้าเดียว
            </p>
            <Link
              href="/explore"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-teal-700 shadow-sm transition-all hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600"
            >
              เริ่มจัดการข้อมูล
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
