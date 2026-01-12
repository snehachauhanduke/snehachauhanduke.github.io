import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__brand">
          <span className="footer__logo">SC</span>
          <span className="footer__tagline">Strategy & Analytics</span>
        </div>

        <nav className="footer__nav">
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Sneha Chauhan. All rights reserved.
          </p>
          <p className="footer__location">Durham, NC</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
