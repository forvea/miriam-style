import { Layout, SectionErrorBoundary } from '@/components/layout'
import {
  AboutSection, CtaFinalSection, FaqSection, FeaturesSection, HeroSection,
  MapSection, ServicesSection, TeamSection, TestimonialsSection,
} from '@/components/sections'

/** Ordine delle sezioni: template-landing §2, con le opzionali dove esistono i dati */
export function Home(): React.JSX.Element {
  return (
    <Layout isHome>
      <SectionErrorBoundary><HeroSection /></SectionErrorBoundary>
      <SectionErrorBoundary><FeaturesSection /></SectionErrorBoundary>
      <SectionErrorBoundary><TestimonialsSection /></SectionErrorBoundary>
      <SectionErrorBoundary><ServicesSection /></SectionErrorBoundary>
      <SectionErrorBoundary><TeamSection /></SectionErrorBoundary>
      <SectionErrorBoundary><AboutSection /></SectionErrorBoundary>
      <SectionErrorBoundary><FaqSection /></SectionErrorBoundary>
      <SectionErrorBoundary><CtaFinalSection /></SectionErrorBoundary>
      <SectionErrorBoundary><MapSection /></SectionErrorBoundary>
    </Layout>
  )
}

export default Home
