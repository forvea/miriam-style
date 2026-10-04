import { Reveal, SectionHeading, TeamCard } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { initials } from '@/utils'

export function TeamSection(): React.JSX.Element {
  // [EDIT] operatrici: obbligatorie nel template prenotazione
  const { team, business } = TEMPLATE_CONFIG
  return (
    <section id="team" aria-labelledby="titolo-team" className="section-y bg-surface">
      <div className="container-site">
        <SectionHeading
          id="titolo-team"
          eyebrow="Il team"
          title={`Chi ti segue da ${business.name}?`}
          intro="Quando prenoti online puoi scegliere l’operatrice, oppure la prima disponibile."
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
          {team.map((member, i) => (
            <li key={member.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <TeamCard
                  name={member.name}
                  role={member.role}
                  specialization={member.specialization}
                  initials={initials(member.name)}
                  photoSrc={member.photoFile ? `/assets/team/${member.photoFile}` : undefined}
                  detail={member.yearsOfExperience ? `${member.yearsOfExperience} anni di esperienza` : member.bio}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
