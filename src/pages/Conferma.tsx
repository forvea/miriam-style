import { ConfirmationView } from '@/components/booking'
import { Layout, SectionErrorBoundary } from '@/components/layout'

/** /conferma?id={bookingId}&token={cancellationToken} — anche dal link nell'email */
export function Conferma(): React.JSX.Element {
  const params = new URLSearchParams(window.location.search)
  return (
    <Layout>
      <div className="container-site py-8 md:py-12">
        <SectionErrorBoundary>
          <ConfirmationView id={params.get('id')} token={params.get('token')} />
        </SectionErrorBoundary>
      </div>
    </Layout>
  )
}

export default Conferma
