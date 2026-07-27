import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';

import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
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
          observer.unobserve(entry.target); // Optimize: Stop observing once revealed
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Initialize Lenis Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="film-grain"></div>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />

        <Contact />
      </main>
      <footer>
        <div className="container footer-content">
          <div className="footer-logo">
            <img src="/macken-logo.png" alt="MACKEN" className="logo-svg-small" />
          </div>
          <div className="footer-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} MACKEN B2B White Label. All rights reserved.</p>
            <a href="https://www.instagram.com/mackenbusiness/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', transition: 'color 0.3s ease' }} title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
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

        .logo-svg-small {
          width: 60px;
          height: 26px;
          object-fit: cover;
          object-position: center;
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
