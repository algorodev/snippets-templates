import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getContent, getAllStaticParams } from '@/lib/content'
import { CATEGORY_CONFIG, CATEGORIES } from '@/lib/types'
import type { Category } from '@/lib/types'
import CategoryBadge from '@/components/CategoryBadge'
import LanguageBadge from '@/components/LanguageBadge'
import Pre from '@/components/Pre'
import type { Metadata } from 'next'
import type React from 'react'

export async function generateStaticParams() {
  return getAllStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category, slug } = await params
  if (!CATEGORIES.includes(category as Category)) return {}
  try {
    const item = getContent(category as Category, slug)
    return { title: `${item.title} — snippets.dev`, description: item.description }
  } catch {
    return {}
  }
}

const mdxComponents = {
  pre: Pre as unknown as React.ComponentType<{ children: React.ReactNode }>,
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params

  if (!CATEGORIES.includes(category as Category)) notFound()

  let item
  try {
    item = getContent(category as Category, slug)
  } catch {
    notFound()
  }

  const config = CATEGORY_CONFIG[item.category]

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-gray-200"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <CategoryBadge category={item.category} />
          <LanguageBadge language={item.language} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {item.title}
        </h1>
        <p className="mt-2 text-gray-400">{item.description}</p>

        {item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-gray-800 px-2 py-1 font-mono text-xs text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {(item.repo || item.demo) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {item.repo && (
              <a
                href={item.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-700"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
            )}
            {item.demo && (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${config.badge} ring-1 ring-inset`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live demo
              </a>
            )}
          </div>
        )}
      </header>

      {item.preview && (
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-800">
          <Image
            src={item.preview}
            alt={`Preview of ${item.title}`}
            width={1200}
            height={630}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:text-gray-100 prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-gray-100 prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline prose-table:text-gray-300 prose-th:text-gray-100 prose-th:border-gray-700 prose-td:border-gray-800">
        <MDXRemote
          source={item.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </main>
  )
}
