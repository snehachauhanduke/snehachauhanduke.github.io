import './Projects.css'
import humaCover from '/Users/sneha/Downloads/portfolio/src/assets/huma.AI cover.png'
import EliCover from '/Users/sneha/Downloads/portfolio/src/assets/Eli Lily Cover cover.png'
import EBNCover from '/Users/sneha/Downloads/portfolio/src/assets/EBNCover cover.png'
import NetflixCover from '/Users/sneha/Downloads/portfolio/src/assets/Netflix Cover cover.png'


interface Project {
  title: string
  subtitle: string
  description: string
  skills: string[]
  period: string
  tag: string
  coverImage?: string
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
      coverImage: humaCover,
      presentationUrl: 'https://drive.google.com/file/d/1PeAiwZBI-RLsPOdv2fsXPH2qAt8TobdN/view?usp=sharing',
    },
    {
      title: 'Evolve By Nature (EBN)',
      subtitle: 'Data-Driven CMO Evaluation and Market Positioning',
      description:
        'Developed a quantitative framework to evaluate global CMO partners and supported product-specific marketing strategy through customer segmentation and differentiated positioning analysis.',
      skills: ['Framework Design', 'Quantitative Decision Framework', 'Marketing & Customer Segmentation', 'Commercialization Strategy'],
      period: 'Aug 2025 – Dec 2025',
      tag: 'Pro-Bono Consulting Project',
      coverImage: EBNCover,
      presentationUrl: 'https://drive.google.com/file/d/1YLCZ9D3Y9-CxJXTpvN826jqYiQKOfg5i/view?usp=sharing',
    },
    {
      title: 'Strategic Analysis of Eli Lilly',
      subtitle: 'AI-Driven Innovation and the Future of Pharmaceutical R&D',
      description:
        "Analyzed Eli Lilly's competitive position within the global pharmaceutical ecosystem, focusing on AI-led drug development, regulatory challenges, and affordability. Delivered strategic recommendations to support innovation, efficiency, and long-term growth.",
      skills: ['Competitive Strategy', 'Industry & Market Analysis', 'AI & Innovation Strategy', 'STEEP Analysis'],
      period: 'Aug 2025 – Dec 2025',
      tag: 'Case Study',
      coverImage: EliCover,
      presentationUrl: 'https://drive.google.com/file/d/10NMwJuEcmI0yrj50XQ1AnXB61NWAqeMC/view?usp=sharing',
    },
    {
      title: 'Strategic Analysis of Netflix',
      subtitle: 'AI, Interactive Storytelling, and Platform Evolution',
      description:
        "Analyzed Netflix's strategic shift from a traditional streaming service to an AI-enabled, participatory storytelling platform. Assessed market trends, competitive dynamics, and ecosystem threats to develop recommendations focused on AI–human co-creation, interactive content formats, and long-term platform leadership.",
      skills: ['Market & Competitor Analysis', 'AI & Digital Transformation Strategy', 'Ecosystem & Business Model Analysis', 'Strategic Storytelling & Executive Presentation'],
      period: 'Aug 2025 – Dec 2025',
      tag: 'Case Study',
      coverImage: NetflixCover,
      presentationUrl: 'https://drive.google.com/file/d/1Fpb5AeWT3RGJpIQfGS8AAOPs-XYQ45Lr/view?usp=sharing',
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
              <div className="project-card__image-container">
                <div className="project-card__image">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={`${project.title} cover`}
                      className="project-card__cover"
                    />
                  ) : (
                    <div className="project-card__image-placeholder">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  )}
                </div>
                {project.presentationUrl && (
                  <button
                    className="project-card__view-btn"
                    onClick={() => handlePresentationClick(project.presentationUrl)}
                  >
                    View Project
                  </button>
                )}
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