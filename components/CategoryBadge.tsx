import { CATEGORY_CONFIG } from '@/lib/types'
import type { Category } from '@/lib/types'

export default function CategoryBadge({ category }: { category: Category }) {
  const config = CATEGORY_CONFIG[category]
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${config.badge}`}
    >
      {config.label}
    </span>
  )
}
