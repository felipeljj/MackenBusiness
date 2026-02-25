import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import logo from './assets/logo.svg';
import './index.css';

function App() {
  useEffect(() => {
    // Scroll Observer for reveal animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2 // Trigger slightly later so the animation completes more visibly in frame
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Contact />
        <About />
      </main>
      <footer>
        <div className="container footer-content">
          <div className="footer-logo">
            <img src={logo} alt="MACKEN" className="logo-svg-small" style={{ height: '24px', color: 'white' }} />
          </div>
          <div className="footer-links">
            <p>&copy; {new Date().getFullYear()} MACKEN B2B White Label. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <style>{`
        footer {
          padding: 4rem 0;
          border-top: 1px solid var(--border);
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        @media (max-width: 768px) {
          .footer-content {
              flex-direction: column;
              gap: 2rem;
              text-align: center;
          }
        }
      `}</style>
    </>
  );
}

export default App;
