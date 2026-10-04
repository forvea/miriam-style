import { Component, type ErrorInfo, type ReactNode } from 'react'

interface SectionErrorBoundaryProps {
  children: ReactNode
}

interface SectionErrorBoundaryState {
  hasError: boolean
}

/**
 * MOTIVO: unico componente a classe ammesso (stack.md §4): non esiste ancora un
 * modo funzionale stabile per catturare gli errori di rendering. Se una sezione
 * si rompe, scompare; il resto della pagina resta in piedi, senza messaggi tecnici.
 */
export class SectionErrorBoundary extends Component<SectionErrorBoundaryProps, SectionErrorBoundaryState> {
  state: SectionErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // Nessuna stampa nel codice (stack.md §11): la sezione si nasconde e basta.
  }

  render(): ReactNode {
    return this.state.hasError ? null : this.props.children
  }
}
