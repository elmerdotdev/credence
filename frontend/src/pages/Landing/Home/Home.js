import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../components/Logo/Logo'

// Images
import HeroImage from '../../../images/Home/hero-image.png'
import ReportsImage from '../../../images/Home/reports-graph.png'
import FeatureCalendar from '../../../images/Home/feature_calendar.svg'
import FeatureConnection from '../../../images/Home/feature_connection.svg'
import FeatureNotes from '../../../images/Home/feature_notes.svg'
import FeatureEmail from '../../../images/Home/feature_email.svg'
import AboutImage from '../../../images/Home/about-image.png'
import NewsletterImage from '../../../images/Home/newsletter-image.png'


const Home = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.querySelector('body').removeAttribute("class")
    document.querySelector('body').classList.add('no-sidebar')
    document.body.classList.toggle('mobile-home-menu-visible', isMobileMenuOpen)
  }, [isMobileMenuOpen])

  return (
    <div className="page-home">

      <div id="home-header">
        <div className="section-wrapper">

          <div className="logo">
            <Link to="/#hero">
              <Logo />
            </Link>
          </div>

          <nav className="home-navigation">
            <ul className="nav-page-links">
              <li>
                <Link to="#features">Features</Link>
              </li>
              <li>
                <Link to="#pricing">Pricing</Link>
              </li>
              <li>
                <Link to="#about">About Us</Link>
              </li>
            </ul>

            <ul className="nav-login-buttons">
              <li>
                <Link to="/dashboard">
                  <button className="btn btn-primary-reverse">Login</button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="burger-menu" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>
      </div>

      <section id="hero">
        <div className="section-wrapper">

          <div className="hero-image">
            <img src={HeroImage} alt="Credence Hero" />
          </div>

          <div className="hero-text">
            <h2>Helping You <span>Build Relations</span> Beyond Numbers</h2>
            <p>We know connections are the heart of your business. Let us help you take good care of them.</p>
            <div>
              <Link to="#">
                <button className="btn btn-primary-reverse">Read More</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      <section id="reports">
        <div className="section-wrapper">

          <div className="reports-image">
            <img src={ReportsImage} alt="Credence Reports" />
          </div>

          <div className="reports-text">
            <h2>Focus On <span>What Matters</span></h2>
            <p>Get all the information you need to keep track of your business and make it grow.</p>
            <div>
              <Link to="#">
                <button className="btn btn-primary-reverse">Read More</button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      <section id="features">
        <div className="section-wrapper">

          <h2>Our Features</h2>
          <div className="features-content">
            <div>
              <img src={FeatureCalendar} alt="Credence Calendar" />
              <h3>Calendar</h3>
              <p>Create events and tag your connections to let them know what's coming next.</p>
            </div>

            <div>
              <img src={FeatureConnection} alt="Credence Connection" />
              <h3>Connection</h3>
              <p>Create, update, and follow up with your clients and partners. All in one place</p>
            </div>

            <div>
              <img src={FeatureNotes} alt="Credence Notes" />
              <h3>Notes</h3>
              <p>Customize your meeting notes to never miss the most important details.</p>
            </div>

            <div>
              <img src={FeatureEmail} alt="Credence Email Integration" />
              <h3>Email Integration</h3>
              <p>Review and search for emails without having to leave the app.</p>
            </div>
          </div>

        </div>
      </section>

      <section id="about">
        <div className="section-wrapper">

          <h2>About Us</h2>
          <div className="about-content">
            <div className="about-image">
              <img src={AboutImage} alt="Credence About" />
            </div>

            <div className="about-text">
              <h3>Made with <span>Love</span></h3>
              <p>In Credence, we firmly believe that building meaningful relations is key to drive your business. Learn more about our dedicated team.</p>
              <div>
                <Link to="#">
                  <button className="btn btn-primary-reverse">Read More</button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="newsletter">
        <div className="section-wrapper">

          <div className="newsletter-image">
            <img src={NewsletterImage} alt="Credence Newsletter" />
          </div>

          <div className="newsletter-text">
            <h2>The <span>Credence</span> Newsletter</h2>
            <p>Subscribe to our monthly newsletter to learn about our future features, latest updates, and to have exclusive access to our business insights.</p>
            <form>
              <div className="input-wrapper">
                <label htmlFor="newsletter-email">Email</label>
                <input id="newsletter-email" type="email" placeholder="you@yourcompany.com" />
              </div>

              <div className="newsletter-button">
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </div>
            </form>
          </div>

        </div>
      </section>

      <footer id="home-footer">
        <div className="section-wrapper">

          <div className="footer-columns">
            <div className="footer-column">
              <h3>Credence</h3>
              <p>
                PO Box 57096 East Hastings<br />
                Vancouver, BC, Canada<br />
                V5K 5G6
              </p>
              <p>1-888-924-7524</p>
            </div>

            <div className="footer-column">
              <h4>Subscription</h4>
              <ul>
                <li><Link to="#">Pricing</Link></li>
                <li><Link to="#">Company Support</Link></li>
                <li><Link to="#">Student Pricing</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Discover</h4>
              <ul>
                <li><Link to="#">Blog</Link></li>
                <li><Link to="#">Podcast</Link></li>
                <li><Link to="#">Store</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="#">About Us</Link></li>
                <li><Link to="#">Contact Us</Link></li>
                <li><Link to="#">Contributor Guidelines</Link></li>
                <li><Link to="#">Online Contributor Guidelines</Link></li>
                <li><Link to="#">Advertise With Us</Link></li>
                <li><Link to="#">Affiliate Policy &amp; Information</Link></li>
              </ul>
            </div>
          </div>

          <div className="copyright">
            <span>Copyright &copy; The Planeteers. All rights reserved.</span>
          </div>

        </div>
      </footer>

    </div>
  )
}

export default Home