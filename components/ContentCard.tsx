import Link from 'next/link'
import type { ContentMeta } from '@/lib/types'
import { CATEGORY_CONFIG } from '@/lib/types'
import CategoryBadge from './CategoryBadge'
import LanguageBadge from './LanguageBadge'

export default function ContentCard({ item }: { item: ContentMeta }) {
  const config = CATEGORY_CONFIG[item.category]

  return (
    <Link
      href={`/${item.category}/${item.slug}`}
      className={`group flex flex-col gap-3 rounded-xl border border-gray-800 border-l-2 bg-gray-900 p-5 transition-all hover:border-gray-700 hover:bg-gray-800/80 ${config.border}`}
    >
      <div className="flex items-start justify-between gap-2">
        <CategoryBadge category={item.category} />
        <LanguageBadge language={item.language} />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-100 transition-colors group-hover:text-white">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-400">{item.description}</p>
      </div>

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded px-1.5 py-0.5 text-xs text-gray-500 bg-gray-800 font-mono"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 4 && (
            <span className="text-xs text-gray-600">+{item.tags.length - 4}</span>
          )}
        </div>
      )}
    </Link>
  )
}
