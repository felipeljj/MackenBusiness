import { useState, useRef, useEffect } from 'react';
import ReactCountryFlag from "react-country-flag";
import ProjectModal from './ProjectModal';
import MarketingLP from './MarketingLP';
import MackenSound from './MackenSound';
import PizzaNY from './PizzaNY';
import CanadaMovers from './CanadaMovers';
import AzureMiami from './AzureMiami';
import NovaLaw from './NovaLaw';
import './Portfolio.css';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('video');
    const [activeProject, setActiveProject] = useState(null);

    // Drag State for Dev Grid (if ever needed, kept for reference but unused in new layout)
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Coverflow State for Video
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const videoRefs = useRef([]);

    const cases = [
        // Exemplo de como adicionar um vídeo: passe o caminho do vídeo na propriedade videoSrc
        { title: 'Mansur Sahid', countryCode: 'BR', desc: 'Video Editing & Motion Graphics', videoSrc: '/videos/sahid.mp4', category: 'video' },
        { title: 'Ricardo Franzen', countryCode: 'CA', desc: 'Video Editing & Motion Graphics', videoSrc: '/videos/ricardo.mp4', category: 'video' },
        { title: 'Juliana Pacheco', countryCode: 'BR', desc: 'Video Editing & Motion Graphics', videoSrc: '/videos/juliana.mp4', category: 'video' },
        //{ title: 'Vitória - Solé Mia', desc: 'Video Editing & Motion Graphics', videoSrc: '/videos/vitoria.mp4', category: 'video' },
        //{ title: 'Dr. Elliot Dinetz', desc: 'Video Editing & Motion Graphics', videoSrc: '/videos/elliot.mp4', category: 'video' },
        // Exemplo de como adicionar uma imagem: passe o caminho na propriedade imgSrc (senão, use imgText)
        { title: 'Nova Law Partners', desc: 'React, Corporate UI & Forms', imgSrc: '/images/law_hero.png', category: 'dev', componentId: 'nova' },
        { title: 'Azure Miami Estates', desc: 'React, Luxury Design & Motion', imgSrc: '/images/azure_thumb.png', category: 'dev', componentId: 'azure' },
        { title: 'TrueNorth Immigration', desc: 'React, Forms & CSS', imgSrc: '/images/canada_thumb.png', category: 'dev', componentId: 'canada' },
        { title: 'GrowSpace LP', desc: 'React & UI Design', imgSrc: '/images/marketing_thumb.png', category: 'dev', componentId: 'marketing' },
        { title: 'Luigi\'s NY Slices', desc: 'React & UI Animations', imgSrc: '/images/pizza_thumb.png', category: 'dev', componentId: 'pizza' },
        { title: 'MackenSound', desc: 'React, State & Flexbox', imgSrc: '/images/mackensound_thumb.png', category: 'dev', componentId: 'spotify' },
    ];

    // Dev Drag Handlers (Legacy, kept to prevent errors if ref were used)
    const handleMouseDown = () => { };
    const handleMouseLeave = () => { };
    const handleMouseUp = () => { };
    const handleMouseMove = () => { };

    // 3D Coverflow Navigation
    const videoCases = cases.filter(c => c.category === 'video');
    const filteredCases = cases.filter(c => c.category === activeTab);

    const nextVideo = () => {
        setActiveVideoIndex((prev) => (prev + 1) % videoCases.length);
    };

    const prevVideo = () => {
        setActiveVideoIndex((prev) => (prev - 1 + videoCases.length) % videoCases.length);
    };

    // Explicitly handle Video Play/Pause states
    useEffect(() => {
        if (activeTab === 'video' && videoRefs.current.length > 0) {
            videoRefs.current.forEach((video, index) => {
                if (video) {
                    if (index === activeVideoIndex) {
                        video.play().catch(e => console.log("Auto-play prevented", e));
                    } else {
                        video.pause();
                        video.currentTime = 0; // Reset to start
                    }
                }
            });
        }
    }, [activeVideoIndex, activeTab]);

    return (
        <section className="portfolio" id="portfolio">
            <div className="container">
                <div className="portfolio-header reveal">
                    <h2 className="section-title">Selected Cases</h2>
                    <p>A glimpse into what we've built</p>
                </div>

                <div className="portfolio-tabs reveal delay-1">
                    <button
                        className={`tab-btn hoverable ${activeTab === 'video' ? 'active' : ''}`}
                        onClick={() => setActiveTab('video')}
                    >
                        Video Editing
                    </button>
                    <button
                        className={`tab-btn hoverable ${activeTab === 'dev' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dev')}
                    >
                        Development
                    </button>
                </div>

                {activeTab === 'dev' ? (
                    <div className="portfolio-grid-dev">
                        {filteredCases.map((c, index) => (
                            <article
                                key={index}
                                className={`case-card hoverable reveal delay-${(index % 4) + 1}`}
                                style={{ '--animation-order': index }}
                                onClick={() => {
                                    if (c.componentId) {
                                        setActiveProject(c.componentId);
                                    }
                                }}
                            >
                                <div className="case-image">
                                    {c.imgSrc ? (
                                        <img
                                            src={c.imgSrc}
                                            alt={c.title}
                                            className="portfolio-media"
                                        />
                                    ) : (
                                        <div className="img-placeholder">{c.imgText}</div>
                                    )}
                                </div>
                                <div className="case-info">
                                    <h3>
                                        {c.title}
                                        {c.countryCode && <ReactCountryFlag countryCode={c.countryCode} svg style={{ marginLeft: '10px', width: '1em', height: '1em', verticalAlign: '-0.15em', borderRadius: '2px', objectFit: 'cover' }} title={c.countryCode} />}
                                    </h3>
                                    <p>{c.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="video-coverflow-wrapper">
                        <button className="video-nav-btn prev" onClick={prevVideo}>&#10094;</button>

                        <div className="portfolio-coverflow">
                            {videoCases.map((c, index) => {
                                // Calculate relative position
                                let offset = index - activeVideoIndex;
                                // Handle wrap-around for smooth looping if needed
                                if (offset > videoCases.length / 2) offset -= videoCases.length;
                                if (offset < -videoCases.length / 2) offset += videoCases.length;

                                const isActive = index === activeVideoIndex;
                                const isPrev = offset === -1;
                                const isNext = offset === 1;

                                let className = 'coverflow-card';
                                if (isActive) className += ' active';
                                else if (isPrev) className += ' prev';
                                else if (isNext) className += ' next';
                                else className += ' hidden';

                                return (
                                    <article
                                        key={index}
                                        className={className}
                                        onClick={() => {
                                            if (!isActive) setActiveVideoIndex(index);
                                        }}
                                    >
                                        <div className="coverflow-video-container">
                                            <video
                                                ref={el => videoRefs.current[index] = el}
                                                // Only load the video if it's the active one, or immediately adjacent
                                                src={Math.abs(offset) <= 1 ? c.videoSrc : ""}
                                                preload={Math.abs(offset) <= 1 ? "auto" : "none"}
                                                loop
                                                muted={!isActive || isMuted} // force mute if inactive, otherwise respect isMuted
                                                playsInline
                                                className="portfolio-media"
                                            />
                                            {isActive && (
                                                <button
                                                    className="volume-toggle-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsMuted(!isMuted);
                                                    }}
                                                    aria-label={isMuted ? "Unmute" : "Mute"}
                                                >
                                                    {isMuted ? (
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="volume-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                                                    ) : (
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="volume-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                        <div className={`case-info ${isActive ? 'visible' : 'hidden'}`}>
                                            <h3>
                                                {c.title}
                                                {c.countryCode && <ReactCountryFlag countryCode={c.countryCode} svg style={{ marginLeft: '10px', width: '1em', height: '1em', verticalAlign: '-0.15em', borderRadius: '2px', objectFit: 'cover' }} title={c.countryCode} />}
                                            </h3>
                                            <p>{c.desc}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <button className="video-nav-btn next" onClick={nextVideo}>&#10095;</button>
                    </div>
                )}
            </div>

            <ProjectModal isOpen={activeProject !== null} onClose={() => setActiveProject(null)}>
                {activeProject === 'nova' && <NovaLaw />}
                {activeProject === 'azure' && <AzureMiami />}
                {activeProject === 'canada' && <CanadaMovers />}
                {activeProject === 'marketing' && <MarketingLP />}
                {activeProject === 'spotify' && <MackenSound />}
                {activeProject === 'pizza' && <PizzaNY />}
            </ProjectModal>
        </section>
    );
};

export default Portfolio;
