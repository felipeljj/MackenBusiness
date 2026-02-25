import { useState } from 'react';
import ProjectModal from './ProjectModal';
import MarketingLP from './MarketingLP';
import MackenSound from './MackenSound';
import './Portfolio.css';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('video');
    const [activeProject, setActiveProject] = useState(null);

    const cases = [
        // Exemplo de como adicionar um vídeo: passe o caminho do vídeo na propriedade videoSrc
        { title: 'Ava yuergens', desc: 'Video Editing & Motion Graphics', videoSrc: '/videos/avayu.mp4', category: 'video' },
        { title: 'Ricardo Franzen', desc: 'Video Editing & Motion Graphics', videoSrc: '/videos/ricardo.mp4', category: 'video' },
        // Exemplo de como adicionar uma imagem: passe o caminho na propriedade imgSrc (senão, use imgText)
        { title: 'GrowSpace LP', desc: 'React & UI Design', imgSrc: '/images/marketing_thumb.png', category: 'dev', componentId: 'marketing' },
        { title: 'MackenSound', desc: 'React, State & Flexbox', imgSrc: '/images/mackensound_thumb.png', category: 'dev', componentId: 'spotify' },
    ];

    const filteredCases = cases.filter(c => c.category === activeTab);

    return (
        <section className="portfolio" id="portfolio">
            <div className="container">
                <div className="portfolio-header reveal">
                    <h2 className="section-title">Selected Cases</h2>
                    <p>A glimpse into what we've built for our partners.</p>
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

                <div className="portfolio-grid">
                    {filteredCases.map((c, index) => (
                        <article
                            key={index}
                            className={`case-card hoverable reveal active`}
                            onClick={() => {
                                if (c.componentId) {
                                    setActiveProject(c.componentId);
                                }
                            }}
                        >
                            <div className="case-image">
                                {c.videoSrc ? (
                                    <video
                                        src={c.videoSrc}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="portfolio-media"
                                    />
                                ) : c.imgSrc ? (
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
                                <h3>{c.title}</h3>
                                <p>{c.desc}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <ProjectModal isOpen={activeProject !== null} onClose={() => setActiveProject(null)}>
                {activeProject === 'marketing' && <MarketingLP />}
                {activeProject === 'spotify' && <MackenSound />}
            </ProjectModal>
        </section>
    );
};

export default Portfolio;
