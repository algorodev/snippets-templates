export type Category = 'snippets' | 'templates' | 'cli' | 'configs'

export const CATEGORIES: Category[] = ['snippets', 'templates', 'cli', 'configs']

export const CATEGORY_CONFIG: Record<
  Category,
  { label: string; description: string; accent: string; badge: string; border: string }
> = {
  snippets: {
    label: 'Snippets',
    description: 'Reusable code fragments',
    accent: 'text-violet-400',
    badge: 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
    border: 'border-l-violet-500',
  },
  templates: {
    label: 'Templates',
    description: 'Full project boilerplates',
    accent: 'text-blue-400',
    badge: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
    border: 'border-l-blue-500',
  },
  cli: {
    label: 'CLI',
    description: 'Shell scripts & commands',
    accent: 'text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    border: 'border-l-emerald-500',
  },
  configs: {
    label: 'Configs',
    description: 'Tool configurations',
    accent: 'text-amber-400',
    badge: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
    border: 'border-l-amber-500',
  },
}

export interface ContentMeta {
  slug: string
  category: Category
  title: string
  description: string
  language: string
  tags: string[]
  preview?: string
  repo?: string
  demo?: string
}

export interface ContentItem extends ContentMeta {
  content: string
}
