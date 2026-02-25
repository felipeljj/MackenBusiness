import { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
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
                    <img src={logo} alt="MACKEN Logo" className="logo-svg" />
                </a>
                <div className="nav-links">
                    <a href="#about" className="nav-link hoverable">About</a>
                    <a href="#portfolio" className="nav-link hoverable">Portfolio</a>
                    <a href="#contact" className="nav-link btn-contact hoverable">Let's Talk</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
