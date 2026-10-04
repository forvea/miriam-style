import type { CustomerErrors, CustomerInput } from '@/utils'
import { NAME_MAX_LENGTH, PHONE_PREFIX } from '@/utils'
import { describedBy, FormField } from './FormField'

interface CustomerFieldsProps {
  values: CustomerInput
  errors: CustomerErrors
  onChange: (field: 'name' | 'phone' | 'email' | 'notes', value: string) => void
}

// Lunghezza massima del telefono: protezione in più, il controllo vero è 9–11 cifre
const PHONE_MAX_LENGTH = 50

export function CustomerFields({ values, errors, onChange }: CustomerFieldsProps): React.JSX.Element {
  return (
    <div className="grid gap-4">
      <FormField id="nome" label="Nome e cognome (obbligatorio)" error={errors.name}>
        <input id="nome" className="field-input" autoComplete="name" maxLength={NAME_MAX_LENGTH} value={values.name}
          aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('nome', false, Boolean(errors.name))}
          onChange={(e) => onChange('name', e.target.value)} />
      </FormField>
      <FormField id="telefono" label="Telefono (obbligatorio)" hint="Solo il numero, senza +39: da 9 a 11 cifre." error={errors.phone}>
        <div className="flex">
          <span className="inline-flex items-center rounded-l-sm border border-r-0 border-line-strong bg-surface px-3 text-ink-muted">{PHONE_PREFIX}</span>
          <input id="telefono" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={PHONE_MAX_LENGTH}
            className="field-input rounded-l-none" value={values.phone}
            aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy('telefono', true, Boolean(errors.phone))}
            onChange={(e) => onChange('phone', e.target.value)} />
        </div>
      </FormField>
      <FormField id="email" label="Email (obbligatoria)" hint="Ti inviamo qui la conferma con il collegamento per gestire la prenotazione." error={errors.email}>
        <input id="email" type="email" autoComplete="email" className="field-input" value={values.email}
          aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email', true, Boolean(errors.email))}
          onChange={(e) => onChange('email', e.target.value)} />
      </FormField>
      <FormField id="note" label="Note (facoltative)" error={errors.notes}>
        <textarea id="note" rows={3} className="field-input" value={values.notes}
          aria-describedby={describedBy('note', false, Boolean(errors.notes))}
          onChange={(e) => onChange('notes', e.target.value)} />
      </FormField>
    </div>
  )
}
