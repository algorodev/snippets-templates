import { codeToHtml } from 'shiki'
import CopyButton from './CopyButton'
import type React from 'react'

interface CodeProps {
  className?: string
  children?: string | string[]
}

export default async function Pre({
  children,
}: {
  children: React.ReactElement<CodeProps>
}) {
  const raw = children?.props?.children
  const code = (Array.isArray(raw) ? raw.join('') : (raw ?? '')).trim()
  const lang = children?.props?.className?.replace('language-', '') ?? 'text'

  let html: string
  try {
    html = await codeToHtml(code, { lang, theme: 'github-dark' })
  } catch {
    html = `<pre style="background:#24292e;padding:1.25rem;border-radius:0.75rem;overflow-x:auto"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
  }

  return (
    <div className="group relative my-6">
      <CopyButton code={code} />
      <div
        className="overflow-hidden rounded-xl border border-gray-800 [&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:!rounded-none [&>pre]:p-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
