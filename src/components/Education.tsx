import './Education.css'

const Education = () => {
  const education = [
    {
      institution: 'Duke University',
      location: 'Durham, NC',
      degree: 'Master of Engineering Management',
      period: 'Aug 2025 – May 2027 (Expected)',
      gpa: '4.0/4.0',
      coursework: [
        'Managing AI in Business',
        'Competitive Strategy',
        'Marketing',
        'Finance',
        'Consulting Practicum',
      ],
    },
    {
      institution: 'National Institute of Technology, Uttarakhand',
      location: 'Uttarakhand, India',
      degree: 'Bachelor of Technology, Computer Science and Engineering',
      period: 'Jul 2016 – Aug 2020',
      gpa: '3.8/4.0',
      highlight: 'Research Assistant: Developed a CNN model for image colorization achieving 85%+ accuracy',
    },
  ]

  return (
    <section className="education" id="education">
      <div className="container">
        <span className="section-label">Background</span>
        <h2 className="section-title">
          <em>Education</em>
        </h2>

        <div className="education__grid">
          {education.map((edu, index) => (
            <div 
              key={edu.institution} 
              className="education__card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="education__header">
                <div className="education__institution-group">
                  <h3 className="education__institution">{edu.institution}</h3>
                  <span className="education__location">{edu.location}</span>
                </div>
                <span className="education__period">{edu.period}</span>
              </div>

              <div className="education__body">
                <p className="education__degree">{edu.degree}</p>
                
                <div className="education__gpa">
                  <span className="education__gpa-label">GPA</span>
                  <span className="education__gpa-value">{edu.gpa}</span>
                </div>

                {edu.coursework && (
                  <div className="education__coursework">
                    <span className="education__coursework-label">Relevant Coursework</span>
                    <div className="education__coursework-list">
                      {edu.coursework.map((course) => (
                        <span key={course} className="education__course">{course}</span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.highlight && (
                  <div className="education__highlight">
                    <span className="education__highlight-icon">★</span>
                    <p>{edu.highlight}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
