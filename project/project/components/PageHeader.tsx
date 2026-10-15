import Link from 'next/link';

type PageHeaderProps = {
  title: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
};

export default function PageHeader({
  title,
  backHref = '/',
  backLabel = 'กลับหน้าแรก',
  actions,
}: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={backHref}
          className="flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-teal-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {backLabel}
        </Link>
        <h1 className="text-lg font-bold text-stone-900">{title}</h1>
        <div className="flex items-center gap-3">{actions}</div>
      </div>
    </header>
  );
}
