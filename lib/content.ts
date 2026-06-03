import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Category, ContentItem, ContentMeta } from './types'
import { CATEGORIES } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function parseMeta(
  category: Category,
  slug: string,
  data: Record<string, unknown>
): ContentMeta {
  return {
    slug,
    category,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? '',
    language: (data.language as string) ?? 'text',
    tags: (data.tags as string[]) ?? [],
    preview: data.preview as string | undefined,
    repo: data.repo as string | undefined,
    demo: data.demo as string | undefined,
  }
}

function getSlugs(category: Category): string[] {
  const dir = path.join(CONTENT_DIR, category)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

export function getContent(category: Category, slug: string): ContentItem {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { content, ...parseMeta(category, slug, data) }
}

export function getAllContent(): ContentMeta[] {
  return CATEGORIES.flatMap((category) =>
    getSlugs(category).map((slug) => {
      const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)
      return parseMeta(category, slug, data)
    })
  )
}

export function getAllStaticParams() {
  return CATEGORIES.flatMap((category) =>
    getSlugs(category).map((slug) => ({ category, slug }))
  )
}
