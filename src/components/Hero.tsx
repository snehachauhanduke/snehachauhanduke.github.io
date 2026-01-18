import './Hero.css'

const Hero = () => {
  const socialLinks = [
  { 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/sneha-chauhan-here/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    )
  },
  { 
    label: 'Email', 
    href: 'mailto:snehachauhan.duke@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    )
  },
   { 
    label: 'Resume', 
    href: 'https://drive.google.com/file/d/1rIVB2FvT6NNj6zIQ3xOwXXHJHY7LPWDe/view?usp=sharing', // Update this path to your actual resume file location
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/>
        <polyline points="9 15 12 18 15 15"/>
      </svg>
    ),
    download: true // Optional flag if you want to handle download behavior differently
  },
]

  return (
    <section className="hero" id="intro">
      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__intro animate-fade-in-up">
            <span className="hero__greeting">Hello, I'm</span>
            <h1 className="hero__name">
              Sneha <em>Chauhan</em>
            </h1>
          
          </div>
       <p className="hero__description animate-fade-in-up delay-2" style={{ textAlign: 'justify' }}>
  Currently pursuing a <span style={{ fontWeight: 600, color: '#89986D' }}>Master of Engineering Management at Duke University</span>.
  My background spans strategy consulting, advanced analytics, and applied AI, with experience building predictive models and driving executive decisions across US and EU markets. From automating forecasting systems to shaping portfolio and go-to-market strategies in healthcare and life sciences, I work at the intersection of technology, data, and strategy to solve complex business problems at scale.
</p>

          <div className="hero__links animate-fade-in-up delay-3">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="hero__link"
                target={link.label === 'Email' || link.label === 'Phone' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <a href="#contact" className="hero__cta animate-fade-in-up delay-4">
            <span>Let's Connect</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        <div className="hero__visual animate-fade-in delay-2">
          <div className="hero__image-wrapper">
            <div className="hero__image-placeholder">
              <span>SC</span>
            </div>
            <div className="hero__image-border"></div>
          </div>
          <div className="hero__badge">
            <span className="hero__badge-label">Seeking</span>
            <span className="hero__badge-text">Summer 2026 Internships and Co-op</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  )
}

export default Hero
