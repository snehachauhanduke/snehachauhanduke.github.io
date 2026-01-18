import './Projects.css'

interface Project {
  title: string
  subtitle: string
  description: string
  skills: string[]
  image?: string
  period: string
  tag: string
  presentationUrl?: string
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'Huma.AI',
      subtitle: 'Commercial Strategy & Rebranding',
      description:
        'Led a commercial strategy and rebranding engagement for Huma.AI, combining LLM-driven analytics with market and competitor analysis to refine positioning, design a new brand identity, and support biopharma market expansion across US and EU markets.',
      skills: ['Brand & Rebranding Strategy', 'Market & Competitor Analysis', 'AI Platform Analytics', 'Go-to-Market'],
      period: 'Aug 2025 – Dec 2025',
      tag: 'Client Project',
      presentationUrl: '',
    },
    {
      title: 'Evolve By Nature (EBN)',
      subtitle: 'Data-Driven CMO Evaluation and Market Positioning',
      description:
        'Developed a quantitative framework to evaluate global CMO partners and supported product-specific marketing strategy through customer segmentation and differentiated positioning analysis.',
      skills: ['Framework Design', 'Quantitative Decision Framework', 'Marketing & Customer Segmentation', 'Commercialization Strategy'],
      period: 'Aug 2025 – Dec 2025',
      tag: 'Pro-Bono Consulting Project',
      presentationUrl: '',
    },
    {
      title: 'Strategic Analysis of Eli Lilly',
      subtitle: 'AI-Driven Innovation and the Future of Pharmaceutical R&D',
      description:
        'Analyzed Eli Lilly’s competitive position within the global pharmaceutical ecosystem, focusing on AI-led drug development, regulatory challenges, and affordability. Delivered strategic recommendations to support innovation, efficiency, and long-term growth',
      skills: ['Competitive Strategy', 'Industry & Market Analysis', 'AI & Innovation Strategy', 'STEEP Analysis'],
      period: 'Aug 2025 – Dec 2025',
      tag: 'Case Study',
      presentationUrl: '',
    },
  ]

  const handlePresentationClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="projects" id="work">
      <div className="container">
        <span className="projects__label">Featured Projects</span>
        <h2 className="projects__title">
          Projects That Shaped My <em>Consulting Skills</em>
        </h2>
        <p className="projects__subtitle">
          A showcase of strategic initiatives and analytical solutions that delivered measurable business impact.
        </p>
        <div className="projects__list">
          {projects.map((project, index) => (
            <article key={project.title} className="project-card">
              <div
                className={`project-card__image ${project.presentationUrl ? 'project-card__image--clickable' : ''}`}
                onClick={() => handlePresentationClick(project.presentationUrl)}
                role={project.presentationUrl ? 'button' : undefined}
                tabIndex={project.presentationUrl ? 0 : undefined}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handlePresentationClick(project.presentationUrl)
                  }
                }}
              >
                <div className="project-card__image-placeholder">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {project.presentationUrl && (
                    <div className="project-card__view-hint">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      <span>View Presentation</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="project-card__content">
                <div className="project-card__header">
                  <span className="project-card__tag">{project.tag}</span>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__role">{project.subtitle}</p>
                <p className="project-card__description">{project.description}</p>

                <div className="project-card__skills">
                  <span className="project-card__skills-label">
                    <span className="project-card__skills-dot"></span>
                    Key Skills Applied
                  </span>
                  <div className="project-card__skills-list">
                    {project.skills.map((skill) => (
                      <span key={skill} className="project-card__skill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects