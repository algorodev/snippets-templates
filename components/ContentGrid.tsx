'use client'
import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import type { ContentMeta, Category } from '@/lib/types'
import { CATEGORIES, CATEGORY_CONFIG } from '@/lib/types'
import ContentCard from './ContentCard'

export default function ContentGrid({ items }: { items: ContentMeta[] }) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')

  const languages = useMemo(() => {
    const langs = new Set(items.map((i) => i.language))
    return ['all', ...Array.from(langs).sort()]
  }, [items])

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ['title', 'description', 'tags', 'language'],
        threshold: 0.35,
        includeScore: true,
      }),
    [items]
  )

  const filtered = useMemo(() => {
    let results = query.trim()
      ? fuse.search(query.trim()).map((r) => r.item)
      : items
    if (selectedCategory !== 'all')
      results = results.filter((i) => i.category === selectedCategory)
    if (selectedLanguage !== 'all')
      results = results.filter((i) => i.language === selectedLanguage)
    return results
  }, [query, selectedCategory, selectedLanguage, fuse, items])

  const categoryTabs = [
    { key: 'all' as const, label: 'All' },
    ...CATEGORIES.map((c) => ({ key: c, label: CATEGORY_CONFIG[c].label })),
  ]

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search snippets, templates, commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-800 bg-gray-900 py-3 pl-10 pr-4 text-sm text-gray-100 placeholder-gray-500 outline-none transition-colors focus:border-gray-600 focus:bg-gray-800"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-3.5 flex items-center text-gray-500 hover:text-gray-300"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-1.5">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === tab.key
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-1.5 text-sm text-gray-300 outline-none transition-colors hover:border-gray-700 focus:border-gray-600"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All languages' : lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ContentCard key={`${item.category}-${item.slug}`} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-800 py-20 text-center">
          <p className="text-gray-400">No results found for &ldquo;{query}&rdquo;</p>
          <button
            onClick={() => { setQuery(''); setSelectedCategory('all'); setSelectedLanguage('all') }}
            className="mt-3 text-sm text-violet-400 hover:text-violet-300"
          >
            Clear filters
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-gray-600">
        {filtered.length} of {items.length} items
      </p>
    </div>
  )
}
