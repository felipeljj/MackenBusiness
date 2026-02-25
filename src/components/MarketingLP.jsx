import { useState, useEffect } from 'react';
import './MarketingLP.css';

const Icons = {
    Rocket: () => (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5zm0 16a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zM21.5 12a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM5.5 12a.5.5 0 0 1-.5.5H3a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM17.657 17.657a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM7.757 7.757a.5.5 0 0 1-.707 0L5.636 6.343a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zm9.9 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 9.9a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
        </svg>
    ),
    Bolt: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" />
        </svg>
    ),
    Brain: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.1 18h-2.2c-.5 0-.9-.4-.9-.9v-1.2c-1.3-.3-2.5-.9-3.4-1.8l-.9.9c-.3.3-.9.3-1.2 0l-1.6-1.6c-.3-.3-.3-.9 0-1.2l.9-.9c-.9-.9-1.5-2.1-1.8-3.4H3.9c-.5 0-.9-.4-.9-.9v-2.2c0-.5.4-.9.9-.9h1.2c.3-1.3.9-2.5 1.8-3.4l-.9-.9c-.3-.3-.3-.9 0-1.2l1.6-1.6c.3-.3.9-.3 1.2 0l.9.9c.9-.9 2.1-1.5 3.4-1.8V3.9c0-.5.4-.9.9-.9h2.2c.5 0 .9.4.9.9v1.2c1.3.3 2.5.9 3.4 1.8l.9-.9c.3-.3.9-.3 1.2 0l1.6 1.6c.3.3.3.9 0 1.2l-.9.9c.9.9 1.5 2.1 1.8 3.4h1.2c.5 0 .9.4.9.9v2.2c0 .5-.4.9-.9.9h-1.2c-.3 1.3-.9 2.5-1.8 3.4l.9.9c.3.3.3.9 0 1.2l-1.6 1.6c-.3.3-.9.3-1.2 0l-.9-.9c-.9.9-2.1 1.5-3.4 1.8v1.2c0 .5-.4.9-.9.9zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
        </svg>
    ),
    Lock: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
        </svg>
    )
};

const MarketingLP = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'signup', 'demo', 'checkout'
    const [toastMessage, setToastMessage] = useState('');
    const [chartBars, setChartBars] = useState([30, 60, 100, 80, 50, 70, 40]);

    useEffect(() => {
        const interval = setInterval(() => {
            setChartBars(bars => bars.map(() => Math.floor(Math.random() * 80) + 20));
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const handleInteraction = (action) => {
        setToastMessage(`Action triggered: ${action} `);
        setTimeout(() => setToastMessage(''), 2500);
    };

    const openModal = (type, e) => {
        if (e) e.preventDefault();
        setActiveModal(type);
    };

    const closeModal = () => setActiveModal(null);

    useEffect(() => {
        // Prevent body scroll when this component is active (optional, handled by modal)
    }, []);

    return (
        <div className="marketing-lp">
            {toastMessage && (
                <div className="mlp-toast animate-toast">
                    {toastMessage}
                </div>
            )}

            <nav className="mlp-nav">
                <div className="mlp-logo" onClick={() => window.scrollTo(0, 0)} style={{ cursor: 'pointer' }}>GrowSpace.</div>
                <div className="mlp-links">
                    <a href="#features" onClick={() => handleInteraction('Navegou para Features')}>Features</a>
                    <a href="#pricing" onClick={() => handleInteraction('Navegou para Pricing')}>Pricing</a>
                </div>
            </nav>

            <header className="mlp-hero">
                <div className="mlp-hero-content">
                    <div className="mlp-badge">v2.0 is Live <Icons.Rocket /></div>
                    <h1 className="mlp-title">Scale your marketing effortless.</h1>
                    <p className="mlp-subtitle">Automate your campaigns, track user behavior, and increase your conversion rates by 300% with our AI-driven platform.</p>
                    <div className="mlp-hero-actions">
                        <button className="mlp-btn mlp-btn-large" onClick={(e) => openModal('signup', e)}>Start Free Trial</button>
                        <button className="mlp-btn mlp-btn-secondary mlp-btn-large" onClick={(e) => openModal('demo', e)}>Book a Demo</button>
                    </div>
                </div>
                <div className="mlp-hero-graphic">
                    <div className="mlp-dashboard-mock">
                        <div className="mlp-mock-header">
                            <span className="dot dot-red"></span>
                            <span className="dot dot-yellow"></span>
                            <span className="dot dot-green"></span>
                        </div>
                        <div className="mlp-mock-body">
                            {chartBars.map((height, i) => (
                                <div
                                    key={i}
                                    className={`mlp-chart-bar ${i === 2 ? 'active' : ''}`}
                                    style={{ height: `${height}%` }}
                                    onClick={() => handleInteraction(`Analyzed data point ${i + 1}`)}
                                >
                                    <div className="mlp-chart-tooltip">{height}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <section className="mlp-features" id="features">
                <h2 className="mlp-section-title">Everything you need to grow</h2>
                <div className="mlp-feature-grid">
                    <div className="mlp-feature-card hoverable-card" onClick={() => handleInteraction('Visualizou Feature: Automation')}>
                        <div className="mlp-icon"><Icons.Bolt /></div>
                        <h3>Fast Automation</h3>
                        <p>Set up complex drip campaigns in minutes, not hours.</p>
                    </div>
                    <div className="mlp-feature-card hoverable-card" onClick={() => handleInteraction('Visualizou Feature: AI Analytics')}>
                        <div className="mlp-icon"><Icons.Brain /></div>
                        <h3>AI Analytics</h3>
                        <p>Our engine predicts customer behavior before they act.</p>
                    </div>
                    <div className="mlp-feature-card hoverable-card" onClick={() => handleInteraction('Visualizou Feature: Security')}>
                        <div className="mlp-icon"><Icons.Lock /></div>
                        <h3>Secure Data</h3>
                        <p>Enterprise-grade encryption for all your customer data.</p>
                    </div>
                </div>
            </section>

            <section className="mlp-pricing" id="pricing">
                <div className="mlp-pricing-header">
                    <h2 className="mlp-section-title">Simple, transparent pricing</h2>
                    <p>No hidden fees. Cancel anytime.</p>
                </div>
                <div className="mlp-pricing-grid">
                    <div className="mlp-price-card">
                        <h3>Starter</h3>
                        <div className="mlp-price"><span>$</span>29<span>/mo</span></div>
                        <ul>
                            <li>✓ Up to 1,000 contacts</li>
                            <li>✓ Basic automation</li>
                            <li>✓ Email support</li>
                        </ul>
                        <button className="mlp-btn mlp-btn-outline" style={{ width: '100%' }} onClick={(e) => openModal('checkout', e)}>Choose Starter</button>
                    </div>
                    <div className="mlp-price-card popular">
                        <div className="mlp-popular-badge">Most Popular</div>
                        <h3>Pro</h3>
                        <div className="mlp-price"><span>$</span>79<span>/mo</span></div>
                        <ul>
                            <li>✓ Up to 10,000 contacts</li>
                            <li>✓ Advanced AI Analytics</li>
                            <li>✓ Priority 24/7 support</li>
                            <li>✓ Custom domains</li>
                        </ul>
                        <button className="mlp-btn mlp-btn-large" style={{ width: '100%' }} onClick={(e) => openModal('checkout', e)}>Choose Pro</button>
                    </div>
                </div>
            </section>

            {activeModal && (
                <div className="mlp-modal-overlay" onClick={closeModal} style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div className="mlp-modal-card" onClick={e => e.stopPropagation()} style={{
                        background: 'white', color: '#0f172a', padding: '2.5rem',
                        borderRadius: '16px', maxWidth: '400px', width: '100%',
                        position: 'relative'
                    }}>
                        <button onClick={closeModal} style={{
                            position: 'absolute', top: '16px', right: '16px',
                            background: 'none', border: 'none', fontSize: '1.5rem',
                            cursor: 'pointer', color: '#64748b'
                        }}>✕</button>

                        {activeModal === 'signup' && (
                            <>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>Get Started</h2>
                                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Create your account to start growing.</p>
                                <input type="email" placeholder="Work email" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '1rem' }} />
                                <input type="password" placeholder="Password" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }} />
                                <button className="mlp-btn mlp-btn-large" style={{ width: '100%' }} onClick={() => { handleInteraction('Account created'); closeModal(); }}>Sign Up</button>
                            </>
                        )}

                        {activeModal === 'demo' && (
                            <>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>Book a Demo</h2>
                                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Schedule a walkthrough with our team.</p>
                                <input type="text" placeholder="Full Name" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '1rem' }} />
                                <input type="email" placeholder="Work email" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }} />
                                <button className="mlp-btn mlp-btn-large" style={{ width: '100%' }} onClick={() => { handleInteraction('Demo booked'); closeModal(); }}>Request Demo</button>
                            </>
                        )}

                        {activeModal === 'checkout' && (
                            <>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>Complete Purchase</h2>
                                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Upgrade your plan instantly.</p>
                                <input type="text" placeholder="Card number" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '1rem' }} />
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <input type="text" placeholder="MM/YY" style={{ width: '50%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    <input type="text" placeholder="CVC" style={{ width: '50%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                </div>
                                <button className="mlp-btn mlp-btn-large" style={{ width: '100%' }} onClick={() => { handleInteraction('Payment successful'); closeModal(); }}>Subscribe Now</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketingLP;
