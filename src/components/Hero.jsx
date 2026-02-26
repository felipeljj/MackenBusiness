import InteractiveGrid from './InteractiveGrid';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    const titleVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier
                staggerChildren: 0.1
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const titleText = "WE ARE".split("");
    const mackenText = "MACKEN".split("");

    return (
        <section className="hero selection-dark" id="home">
            <InteractiveGrid />
            <div className="hero-content">
                <motion.h1
                    className="hero-title"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div style={{ display: 'inline-block', overflow: 'hidden' }}>
                        {titleText.map((char, index) => (
                            <motion.span key={`we-${index}`} variants={letterVariants} style={{ display: 'inline-block' }}>
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                    <br />
                    <div style={{ display: 'inline-block', overflow: 'hidden' }}>
                        <span className="text-outline">
                            {mackenText.map((char, index) => (
                                <motion.span key={`macken-${index}`} variants={letterVariants} style={{ display: 'inline-block' }}>
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    </div>
                </motion.h1>
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    The premium B2B white-label agency. <br />
                    Empowering your brand with exceptional digital craftsmanship.
                </motion.p>
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
