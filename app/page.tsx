import { getAllContent } from '@/lib/content'
import { CATEGORY_CONFIG, CATEGORIES } from '@/lib/types'
import ContentGrid from '@/components/ContentGrid'

export default async function Home() {
  const items = getAllContent()

  const counts = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = items.filter((i) => i.category === cat).length
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Code snippets &{' '}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            templates
          </span>
        </h1>
        <p className="mt-3 text-gray-400">
          A curated collection of reusable snippets, boilerplates, CLI commands, and tool configurations.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const config = CATEGORY_CONFIG[cat]
            return (
              <div
                key={cat}
                className="rounded-xl border border-gray-800 bg-gray-900 p-4"
              >
                <p className={`text-2xl font-bold ${config.accent}`}>{counts[cat]}</p>
                <p className="mt-0.5 text-sm font-medium text-gray-300">{config.label}</p>
                <p className="text-xs text-gray-500">{config.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      <ContentGrid items={items} />
    </main>
  )
}
