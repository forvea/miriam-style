import { Layout } from '@/components/layout'
import { PRIVACY_BLOCKS, PRIVACY_UPDATED } from './privacyContent'

export function PrivacyPolicy(): React.JSX.Element {
  return (
    <Layout>
      <article className="container-site max-w-3xl py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl">Informativa sulla privacy</h1>
        <p className="mt-2 text-ink-muted">Ultimo aggiornamento: {PRIVACY_UPDATED}</p>
        {PRIVACY_BLOCKS.map((block) => (
          <section key={block.title} className="mt-8">
            <h2 className="text-xl">{block.title}</h2>
            {block.paragraphs.map((p) => <p key={p.slice(0, 32)} className="mt-3 max-w-prose">{p}</p>)}
          </section>
        ))}
      </article>
    </Layout>
  )
}

export default PrivacyPolicy
