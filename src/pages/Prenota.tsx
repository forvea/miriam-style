import { BookingWidget } from '@/components/booking'
import { Layout, SectionErrorBoundary } from '@/components/layout'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'

export function Prenota(): React.JSX.Element {
  return (
    <Layout showBookingLink={false}>
      <div className="container-site py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl">Prenota da {TEMPLATE_CONFIG.business.name}</h1>
        <p className="mt-2 max-w-prose text-ink-muted">
          Scegli il servizio, l’operatrice, il giorno e l’orario. Ricevi la conferma via email.
        </p>
        <div className="mt-8">
          <SectionErrorBoundary><BookingWidget /></SectionErrorBoundary>
        </div>
      </div>
    </Layout>
  )
}

export default Prenota
