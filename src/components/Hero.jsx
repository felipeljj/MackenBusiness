import InteractiveGrid from './InteractiveGrid';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero selection-dark" id="home">
            <InteractiveGrid />
            <div className="hero-content">
                <h1 className="hero-title reveal delay-1">
                    WE ARE <br />
                    <span className="text-outline">MACKEN</span>
                </h1>
                <p className="hero-subtitle reveal delay-2">
                    The premium B2B white-label agency. <br />
                    Empowering your brand with exceptional digital craftsmanship.
                </p>
                <div className="hero-cta reveal delay-3">
                    <a href="#portfolio" className="btn btn-primary">View Cases</a>
                    <a href="#contact" className="btn btn-secondary">Partner With Us</a>
                </div>
            </div>
            <div className="scroll-indicator reveal delay-4">
                <div className="mouse"></div>
            </div>
        </section>
    );
};

export default Hero;
