import { useState, useEffect, useRef } from 'react';
import './AzureMiami.css';

const Icons = {
    Menu: () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg>,
    ArrowRight: () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
    Play: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
    Diamond: () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none"><polygon points="12 2 22 8.5 12 22 2 8.5 12 2"></polygon><line x1="12" y1="2" x2="12" y2="22"></line><line x1="22" y1="8.5" x2="2" y2="8.5"></line><polyline points="12 22 8 8.5 12 2"></polyline><polyline points="12 22 16 8.5 12 2"></polyline></svg>
};

const AzureMiami = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const heroRef = useRef(null);
    const textRef = useRef(null);

    const images = [
        '/images/miami_hero.png',
        '/images/miami_interior.png',
        '/images/miami_exterior.png'
    ];

    // Scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        const container = document.querySelector('.azure-app');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    // Parallax effect for hero text
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!heroRef.current || !textRef.current) return;

            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20; // max 10px move
            const yPos = (clientY / window.innerHeight - 0.5) * 20;

            textRef.current.style.transform = `translate(${-xPos}px, ${-yPos}px)`;
        };

        const hero = heroRef.current;
        if (hero) {
            hero.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (hero) {
                hero.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    // Auto rotate background images slowly
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="azure-app">
            {/* Navigation */}
            <header className={`az-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="az-container az-header-inner">
                    <div className="az-logo">
                        AZURE
                        <span>Estates</span>
                    </div>

                    <nav className="az-nav-desktop">
                        <a href="#vision">The Vision</a>
                        <a href="#residences">Residences</a>
                        <a href="#amenities">Amenities</a>
                        <a href="#gallery">Gallery</a>
                    </nav>

                    <div className="az-header-right">
                        <button className="az-btn-outline">Inquire Now</button>
                        <button className="az-menu-btn"><Icons.Menu /></button>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Interactive Section */}
                <section className="az-hero" ref={heroRef} id="home">
                    {/* Background Images with Crossfade */}
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`az-hero-bg ${index === activeImage ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${img})` }}
                        ></div>
                    ))}

                    <div className="az-hero-overlay"></div>

                    <div className="az-container az-hero-content">
                        <div className="az-hero-text" ref={textRef}>
                            <h2 className="az-subheading">Brickell, Miami</h2>
                            <h1 className="az-heading">Elevate Your Horizon.</h1>
                            <p className="az-desc">An unprecedented expression of luxury architecture. Azure presents 120 limited-edition oceanfront residences crafted for those who demand the extraordinary.</p>

                            <div className="az-hero-actions">
                                <button className="az-btn-solid">Schedule Private Viewing <Icons.ArrowRight /></button>
                                <button
                                    className="az-btn-play"
                                    onClick={() => setIsVideoPlaying(true)}
                                >
                                    <div className="play-icon-ring"><Icons.Play /></div>
                                    Watch The Film
                                </button>
                            </div>
                        </div>

                        {/* Image Indicators */}
                        <div className="az-indicators">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`az-indicator ${index === activeImage ? 'active' : ''}`}
                                    onClick={() => setActiveImage(index)}
                                    aria-label={`Show image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* The Vision Section */}
                <section className="az-section az-vision" id="vision">
                    <div className="az-container az-vision-grid">
                        <div className="az-vision-text">
                            <span className="az-label"><Icons.Diamond /> Architecture</span>
                            <h2>Where Sky Meets Ocean.</h2>
                            <p>Designed by award-winning architects, Azure rises 60 stories above the Miami skyline. The undulating glass facade reflects the waves of the Atlantic, creating a living sculpture that redefines the city's silhouette.</p>
                            <p>Every residence features floor-to-ceiling windows, imported Italian marble, and unobstructed 360-degree views of Biscayne Bay.</p>
                            <button className="az-link">Explore Design <Icons.ArrowRight /></button>
                        </div>
                        <div className="az-vision-image-wrapper">
                            <img src="/images/miami_exterior.png" alt="Azure Exterior" className="az-vision-img" />
                            <div className="az-floating-card">
                                <h3>$4.5M</h3>
                                <span>Starting Price</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dark Luxury Stats Section */}
                <section className="az-stats">
                    <div className="az-container az-stats-grid">
                        <div className="az-stat-item">
                            <h3>60</h3>
                            <span>Stories High</span>
                        </div>
                        <div className="az-stat-item">
                            <h3>120</h3>
                            <span>Bespoke Residences</span>
                        </div>
                        <div className="az-stat-item">
                            <h3>10K</h3>
                            <span>SqFt Penthouses</span>
                        </div>
                        <div className="az-stat-item">
                            <h3>5★</h3>
                            <span>Hotel Services</span>
                        </div>
                    </div>
                </section>

                {/* Interior Section */}
                <section className="az-section az-interior" id="residences">
                    <div className="az-container az-interior-grid">
                        <div className="az-interior-images">
                            <img src="/images/miami_interior.png" alt="Living Room" className="az-img-large" />
                        </div>
                        <div className="az-interior-text">
                            <span className="az-label"><Icons.Diamond /> Residences</span>
                            <h2>Curated Opulence.</h2>
                            <ul className="az-list">
                                <li>
                                    <h4>Custom Italian Kitchens</h4>
                                    <p>Matte lacquered cabinetry, Calacatta Gold marble islands, and integrated Gaggenau appliances.</p>
                                </li>
                                <li>
                                    <h4>Master Sanctuaries</h4>
                                    <p>Freestanding soaking tubs overlooking the ocean, dual rainfall showers, and midnight bars.</p>
                                </li>
                                <li>
                                    <h4>Smart Home Integration</h4>
                                    <p>Invisible cutting-edge technology controlling climate, lighting, and security with a touch.</p>
                                </li>
                            </ul>
                            <button className="az-btn-solid mt-4">View Floor Plans</button>
                        </div>
                    </div>
                </section>

            </main>

            {/* Premium Footer */}
            <footer className="az-footer">
                <div className="az-container">
                    <div className="az-footer-top">
                        <div className="az-footer-brand">
                            <div className="az-logo large">
                                AZURE
                                <span>Estates</span>
                            </div>
                            <p>1000 Brickell Avenue<br />Miami, FL 33131</p>
                        </div>
                        <div className="az-footer-links">
                            <div className="link-group">
                                <h4>Residences</h4>
                                <a>Penthouses</a>
                                <a>Sky Villas</a>
                                <a>Tower Suites</a>
                            </div>
                            <div className="link-group">
                                <h4>Contact</h4>
                                <a>+1 (305) 555-0199</a>
                                <a>sales@azuremiami.com</a>
                                <a>Press Inquiries</a>
                            </div>
                        </div>
                    </div>
                    <div className="az-footer-bottom">
                        <p>&copy; 2026 Azure Estates Miami. Exclusive representations. Equal Housing Opportunity.</p>
                        <div className="az-legal">
                            <a>Privacy Policy</a>
                            <a>Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Video Modal Overlay */}
            {isVideoPlaying && (
                <div className="az-video-modal" onClick={() => setIsVideoPlaying(false)}>
                    <button className="az-close-video" onClick={() => setIsVideoPlaying(false)}>×</button>
                    <div className="az-video-container" onClick={e => e.stopPropagation()}>
                        {/* Simulating a video player with an image for the mockup */}
                        <div className="az-mock-video">
                            <img src="/images/miami_hero.png" alt="Video Thumbnail" />
                            <div className="play-overlay"><Icons.Play /></div>
                            <p>Azure Estates - The Lifestyle Film</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AzureMiami;
