import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Tools',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      skills: ['SQL', 'Python', 'VBA', 'Excel', 'PowerPoint', 'Tableau', 'Power BI'],
    },
    {
      title: 'Analytics & Modeling',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3v18h18"/>
          <path d="M18 17V9"/>
          <path d="M13 17V5"/>
          <path d="M8 17v-3"/>
        </svg>
      ),
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
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
      ),
      skills: [
        'Agentic AI (DeepLearning.AI)',
        'Google Project Management',
        'Data Analysis with SQL',
        'Advanced Excel',
      ],
    },
    {
      title: 'Interests',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      ),
      skills: [
        'Travel & Content Creation (20K+)',
        'Photography',
        'Music',
      ],
    },
  ]

  return (
    <section className="skills" id="skills">
      <div className="container">
        <span className="section-label">Skills & Expertise</span>
        <h2 className="section-title">
          Technical & <em>Strategic Capabilities</em>
        </h2>
        <p className="section-subtitle">
          A comprehensive toolkit spanning technical implementation, strategic planning, and analytics to deliver data-driven business solutions.
        </p>

        <div className="skills__grid">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title} 
              className="skills__card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skills__card-header">
                <div className="skills__card-icon">
                  {category.icon}
                </div>
                <h3 className="skills__card-title">{category.title}</h3>
              </div>
              <div className="skills__card-tags">
                {category.skills.map((skill) => (
                  <span key={skill} className="skills__tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
