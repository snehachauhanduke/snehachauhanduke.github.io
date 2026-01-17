import './Projects.css'

interface Project {
  title: string
  subtitle: string
  description: string
  skills: string[]
  image?: string
  period: string
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'Huma.AI',
      subtitle: 'LLM-Driven Commercial Analytics',
      description:
        'Leveraged LLM-driven analytics to extract insights from commercial datasets, shaping long-term planning and market expansion strategies. Designed go-to-market commercialization timelines for bio-pharmaceutical launches, enabling a projected 10% increase in demand during critical launch windows across US and EU markets.',
      skills: ['LLM Analytics', 'Market Strategy', 'Biopharma', 'Go-to-Market'],
      period: 'Aug 2025 – Dec 2025',
    },
    {
      title: 'Evolve By Nature (EBN)',
      subtitle: 'CMO Partner Evaluation Framework',
      description:
        'Built a quantitative evaluation framework to assess and rank global CMO partners based on compliance, capabilities, and strategic fit for scalable commercialization. Supported product-line specific marketing strategy by analyzing customer segments and crafting differentiated positioning narratives.',
      skills: ['Framework   Design', 'CMO Evaluation', 'Marketing Strategy', 'Segmentation'],
      period: 'Aug 2025 – Dec 2025',
    },
  ]

  return (
    <section className="projects" id="work">
      <div className="container">
        <span className="projects__label">Featured Projects</span>
        <h2 className="projects__title">
          Projects That Shaped My <em>Consulting Skills</em>
        </h2>
        <p className="projects__subtitle">
          A showcase of strategic initiatives and analytical solutions that delivered measurable business impact.   </p>
        <div className="projects__list">
          {projects.map((project, index) => (
            <article key={project.title} className="project-card">
              <div className="project-card__image">
                <div className="project-card__image-placeholder">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>

              <div className="project-card__content">
                <div className="project-card__header">
                  <span className="project-card__tag">Client Project</span>
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