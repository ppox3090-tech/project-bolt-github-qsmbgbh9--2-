type Category = 'restaurant' | 'cafe' | 'tourist_spot';

const CATEGORY_LABELS: Record<Category, string> = {
  restaurant: 'ร้านอาหาร',
  cafe: 'คาเฟ่',
  tourist_spot: 'สถานที่ท่องเที่ยว',
};

const CATEGORY_STYLES: Record<Category, string> = {
  restaurant: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/80',
  cafe: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/80',
  tourist_spot: 'bg-teal-50 text-teal-700 ring-1 ring-teal-200/80',
};

export default function CategoryBadge({
  category,
  size = 'sm',
}: {
  category: Category;
  size?: 'sm' | 'md';
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        CATEGORY_STYLES[category]
      } ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

export { CATEGORY_LABELS, CATEGORY_STYLES };
export type { Category };
