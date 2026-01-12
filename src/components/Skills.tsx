import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Tools',
      skills: ['SQL', 'Python', 'VBA', 'Excel', 'PowerPoint', 'Tableau', 'Power BI'],
    },
    {
      title: 'Analytics & Modeling',
      skills: [
        'Forecasting',
        'Financial Modeling',
        'Time Series',
        'Monte Carlo Analysis',
        'Sensitivity Analysis',
        'Demand Projection',
      ],
    },
    {
      title: 'Certifications',
      skills: [
        'Agentic AI (DeepLearning.AI)',
        'Google Project Management',
        'Data Analysis with SQL',
        'Advanced Excel',
      ],
    },
  ]

  const interests = ['Travel & Content Creation (20K+ community)', 'Photography', 'Music']

  return (
    <section className="skills" id="skills">
      <div className="container">
        <span className="section-label">Expertise</span>
        <h2 className="section-title">
          Skills & <em>Interests</em>
        </h2>

        <div className="skills__content">
          <div className="skills__categories">
            {skillCategories.map((category, catIndex) => (
              <div 
                key={category.title} 
                className="skills__category"
                style={{ animationDelay: `${catIndex * 0.1}s` }}
              >
                <h3 className="skills__category-title">{category.title}</h3>
                <div className="skills__list">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skills__item">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="skills__interests">
            <h3 className="skills__interests-title">Personal Interests</h3>
            <div className="skills__interests-list">
              {interests.map((interest) => (
                <div key={interest} className="skills__interest">
                  <span className="skills__interest-dot"></span>
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
