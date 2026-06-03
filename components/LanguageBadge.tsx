const LANG_COLORS: Record<string, string> = {
  typescript: 'bg-blue-500/10 text-blue-300 ring-blue-500/20',
  javascript: 'bg-yellow-500/10 text-yellow-300 ring-yellow-500/20',
  python: 'bg-green-500/10 text-green-300 ring-green-500/20',
  bash: 'bg-gray-500/10 text-gray-300 ring-gray-500/20',
  sh: 'bg-gray-500/10 text-gray-300 ring-gray-500/20',
  shell: 'bg-gray-500/10 text-gray-300 ring-gray-500/20',
  json: 'bg-orange-500/10 text-orange-300 ring-orange-500/20',
  css: 'bg-pink-500/10 text-pink-300 ring-pink-500/20',
  html: 'bg-red-500/10 text-red-300 ring-red-500/20',
  rust: 'bg-orange-500/10 text-orange-300 ring-orange-500/20',
  go: 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/20',
}

const DEFAULT_COLOR = 'bg-gray-500/10 text-gray-300 ring-gray-500/20'

export default function LanguageBadge({ language }: { language: string }) {
  const color = LANG_COLORS[language.toLowerCase()] ?? DEFAULT_COLOR
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs ring-1 ring-inset ${color}`}
    >
      {language}
    </span>
  )
}
