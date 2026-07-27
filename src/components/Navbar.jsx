import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar hidden-onload ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="#home" className="logo hoverable">
                    <img src="/macken-logo.png" alt="MACKEN Logo" className="logo-svg" />
                </a>
                <div className="nav-links">
                    <a href="#contact" className="nav-link btn-contact hoverable">Let's Talk</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
