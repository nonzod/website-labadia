import { notFound } from 'next/navigation'

import { EditorialFactList } from '@/components/public/EditorialFactList'
import { EditorialPageHero } from '@/components/public/EditorialPageHero'
import { isSupportedLocale } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'

type LocalePageProps = {
  params: Promise<{
    lang: string
  }>
}

export default async function DimoraPage({ params }: LocalePageProps) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const copy = publicContent[lang].dimora

  return (
    <main className="page-shell" id="main-content">
      <EditorialPageHero {...copy.hero} />
      <EditorialFactList items={copy.facts} title={copy.factsTitle} />
    </main>
  )
}
