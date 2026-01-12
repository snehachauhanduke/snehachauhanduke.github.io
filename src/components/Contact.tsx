import './Contact.css'

const Contact = () => {
  const contactInfo = [
  {
    label: 'Email',
    value: 'snehachauhan.duke@gmail.com',
    href: 'mailto:snehachauhan.duke@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/sneha-chauhan-here',
    href: 'https://www.linkedin.com/in/sneha-chauhan-here/',
  },
]

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__wrapper">
          <div className="contact__header">
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">
              Let's <em>Connect</em>
            </h2>
            <p className="contact__description">
              Currently seeking Summer 2026 internship and Co-op opportunities 
              to apply analytics and AI to solve complex business problems at scale.
            </p>
          </div>

          <div className="contact__content">
            <div className="contact__info">
              {contactInfo.map((item, index) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="contact__item"
                  target={item.label === 'LinkedIn' ? '_blank' : '_self'}
                  rel={item.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="contact__item-label">{item.label}</span>
                  <span className="contact__item-value">{item.value}</span>
                  <span className="contact__item-arrow">→</span>
                </a>
              ))}
            </div>

            <div className="contact__cta">
              <p className="contact__cta-text">
                Open to discussing roles in strategy consulting, 
                analytics, and AI-driven business solutions.
              </p>
              <a 
                href="mailto:snehachauhan.duke@gmail.com" 
                className="contact__button"
              >
                <span>Send a Message</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 2L11 13"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
