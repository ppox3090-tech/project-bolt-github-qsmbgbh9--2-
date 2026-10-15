import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/12905761/pexels-photo-12905761.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="กว๊านพะเยายามอาทิตย์อัสดง"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/70" />
        </div>

        <div className="relative z-10 px-6 text-center animate-fade-in">
          <span className="inline-block rounded-full bg-teal-500/15 px-5 py-1.5 text-sm font-medium text-teal-200 backdrop-blur-sm ring-1 ring-teal-300/20">
            พะเยา · ภาคเหนือตอนบน
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            แนะนำร้านอาหาร
            <br />
            และสถานที่ท่องเที่ยว
            <br />
            <span className="text-teal-300">รอบกว๊านพะเยา</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
            ค้นพบร้านอาหารอร่อย คาเฟ่ริมน้ำ และสถานที่ท่องเที่ยวสวยงาม
            รอบทะเลสาบธรรมชาติที่ใหญ่ที่สุดในภาคเหนือตอนบนของไทย
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2 rounded-xl bg-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-teal-600/30 transition-all hover:bg-teal-500 hover:shadow-xl hover:shadow-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-stone-900"
            >
              เข้าสู่หน้าจัดการข้อมูล
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
            <Link
              href="/features"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              ดูฟีเจอร์ทั้งหมด
            </Link>
          </div>

          {/* Quick access cards */}
          <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              href="/dashboard"
              className="group rounded-xl bg-white/10 p-4 text-left backdrop-blur-sm ring-1 ring-white/15 transition-all hover:bg-white/15"
            >
              <div className="flex items-center gap-2 text-teal-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-semibold text-white">แดชบอร์ด</span>
              </div>
              <p className="mt-1 text-xs text-stone-300">สถิติและข้อมูลสรุป</p>
            </Link>
            <Link
              href="/map"
              className="group rounded-xl bg-white/10 p-4 text-left backdrop-blur-sm ring-1 ring-white/15 transition-all hover:bg-white/15"
            >
              <div className="flex items-center gap-2 text-teal-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-semibold text-white">แผนที่สถานที่</span>
              </div>
              <p className="mt-1 text-xs text-stone-300">ดูตำแหน่งบนแผนที่</p>
            </Link>
            <Link
              href="/explore"
              className="group rounded-xl bg-white/10 p-4 text-left backdrop-blur-sm ring-1 ring-white/15 transition-all hover:bg-white/15"
            >
              <div className="flex items-center gap-2 text-teal-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-semibold text-white">สำรวจสถานที่</span>
              </div>
              <p className="mt-1 text-xs text-stone-300">จัดการข้อมูลทั้งหมด</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-teal-600">ค้นพบสถานที่</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              สถานที่น่าสนใจรอบกว๊านพะเยา
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-stone-600">
              แบ่งตามประเภทเพื่อให้ค้นหาได้ง่าย ไม่ว่าจะมากิน มานั่งชิล หรือมาเที่ยวชมวิว
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Restaurant */}
            <Link
              href="/explore"
              className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/36826038/pexels-photo-36826038.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="ร้านอาหาร"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-rose-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  ร้านอาหาร
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-stone-900">ร้านอาหารอร่อย</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  อาหารเหนือรสเด็ด ปลากว๊านสดๆ และเมนูท้องถิ่นริมน้ำ
                </p>
              </div>
            </Link>

            {/* Cafe */}
            <Link
              href="/explore"
              className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/2079452/pexels-photo-2079452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="คาเฟ่"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  คาเฟ่
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-stone-900">คาเฟ่ริมน้ำ</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  มุมชมวิวกว๊าน กาแฟสด ขนมอร่อย บรรยากาศผ่อนคลาย
                </p>
              </div>
            </Link>

            {/* Tourist Spot */}
            <Link
              href="/explore"
              className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/19878241/pexels-photo-19878241.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="สถานที่ท่องเที่ยว"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-teal-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  สถานที่ท่องเที่ยว
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-stone-900">สถานที่ท่องเที่ยว</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  วัดเก่าแก่ อนุสาวรีย์ และจุดชมทิวทัศน์รอบกว๊านพะเยา
                </p>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2 rounded-xl bg-stone-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
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
