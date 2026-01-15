import './Experience.css'

interface ExperienceItem {
  company: string
  location: string
  roles: {
    title: string
    period: string
    highlights: string[]
  }[]
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      company: 'Genpact',
      location: 'Pune, India',
      roles: [
        {
          title: 'Assistant Manager - Strategy Forecasting',
          period: 'Feb 2025 – Jun 2025',
          highlights: [
            'Enhanced healthcare operations forecasting accuracy by 15% using SQL and Excel predictive models, supporting portfolio and go-to-market decisions',
            'Managed 4 associates, providing working sessions, facilitating client discussions and orchestrating project plans across cross-functional efforts',
            'Developed process automation solutions, reducing manual reporting by 30+ hours and improving operational efficiency',
          ],
        },
      ],
    },
    {
      company: 'ZS Associates',
      location: 'Pune, India',
      roles: [
        {
          title: 'Decision Analytics Associate Consultant',
          period: 'Jan 2023 – Jan 2025',
          highlights: [
            'Lead product management and training for commercial & growth analytics teams, enabling scalable delivery of strategic insights across the biopharma product portfolio',
            'Delivered competitive intelligence and market research across 5+ therapeutic areas, synthesizing patient claims data to inform $100M+ R&D investments',
            'Collaborated with cross-functional teams to identify $75M+ in portfolio risk and influenced executive decisions to secure $15M investment',
          ],
        },
        {
          title: 'Decision Analytics Associate',
          period: 'Oct 2020 – Dec 2022',
          highlights: [
            'Delivered 100+ commercial and market access reports using IQVIA and Symphony Health data guiding pricing, access, and investment strategy',
            'Improved competitive benchmarking across 5 markets by delivering 15+ automated forecasting models in Excel and VBA',
            "Recognized as 'Deep Domain Expert' on a Fortune 500 account, influencing $2B+ portfolio strategy",
          ],
        },
      ],
    },
  ]

  return (
    <section className="experience" id="experience">
      <div className="container">
        <span className="section-label">Career</span>
        <h2 className="section-title">
          Professional <em>Experience</em>
        </h2>

        <div className="experience__timeline">
          {experiences.map((exp, expIndex) => (
            <div key={exp.company} className="experience__company">
              <div className="experience__company-header">
                <h3 className="experience__company-name">{exp.company}</h3>
                <span className="experience__company-location">{exp.location}</span>
              </div>

              <div className="experience__roles">
                {exp.roles.map((role, roleIndex) => (
                  <div 
                    key={role.title} 
                    className="experience__role"
                    style={{ animationDelay: `${(expIndex * 2 + roleIndex) * 0.1}s` }}
                  >
                    <div className="experience__role-header">
                      <h4 className="experience__role-title">{role.title}</h4>
                      <span className="experience__role-period">{role.period}</span>
                    </div>
                    <ul className="experience__highlights">
                      {role.highlights.map((highlight, i) => (
                        <li key={i} className="experience__highlight">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
