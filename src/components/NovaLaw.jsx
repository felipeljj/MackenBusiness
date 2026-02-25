import { useState, useEffect } from 'react';
import './NovaLaw.css';

const Icons = {
    Scale: () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 3v18"></path><path d="M3 8s3-4 5-4 5 4 5 4"></path><path d="M13 8s3-4 5-4 5 4 5 4"></path><path d="M6 13c-2 0-3 1-3 3v2h6v-2c0-2-1-3-3-3z"></path><path d="M18 13c-2 0-3 1-3 3v2h6v-2c0-2-1-3-3-3z"></path><line x1="12" y1="21" x2="12" y2="21"></line></svg>,
    Briefcase: () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
    UserPlus: () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>,
    Shield: () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
    Phone: () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
    Check: () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

const NovaLaw = () => {
    const [scrolled, setScrolled] = useState(false);
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        const appContainer = document.querySelector('.nova-app');
        if (appContainer) appContainer.addEventListener('scroll', handleScroll);
        return () => appContainer && appContainer.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => setFormStatus('idle'), 4000);
        }, 1500);
    };

    return (
        <div className="nova-app">
            {/* Header */}
            <header className={`nova-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="nova-container nova-header-inner">
                    <div className="nova-brand">
                        <Icons.Scale />
                        <div className="nova-brand-text">
                            <strong>Nova Law</strong>
                            <span>Partners</span>
                        </div>
                    </div>
                    <nav className="nova-nav">
                        <a href="#expertise">Expertise</a>
                        <a href="#attorneys">Attorneys</a>
                        <a href="#results">Track Record</a>
                        <div className="nova-phone">
                            <Icons.Phone /> 1-800-NOVA-LAW
                        </div>
                        <button className="nova-btn-primary" onClick={() => document.getElementById('consultation').scrollIntoView()}>
                            Free Case Review
                        </button>
                    </nav>
                </div>
            </header>

            <main>
                {/* Hero */}
                <section className="nova-hero">
                    <div className="nova-hero-bg"></div>
                    <div className="nova-container nova-hero-content">
                        <div className="nova-hero-text">
                            <span className="nova-badge">Employment & Labor Law Specialists</span>
                            <h1>Defending Your Rights in the Workplace.</h1>
                            <p>We are a premier litigation boutique dedicated to representing employees in high-stakes labor disputes. Unyielding advocacy. Proven results.</p>
                            <div className="nova-hero-actions">
                                <button className="nova-btn-solid" onClick={() => document.getElementById('consultation').scrollIntoView()}>
                                    Request Consultation
                                </button>
                                <button className="nova-btn-outline">
                                    Our Practice Areas
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Strip */}
                <div className="nova-trust-strip">
                    <div className="nova-container nova-trust-inner">
                        <div className="nova-trust-item">
                            <h5>Recognized By</h5>
                            <span className="nova-trust-logo">SuperLawyers</span>
                        </div>
                        <div className="nova-trust-item">
                            <h5>$500M+</h5>
                            <span>Recovered for Clients</span>
                        </div>
                        <div className="nova-trust-item">
                            <h5>1,000+</h5>
                            <span>Successful Cases</span>
                        </div>
                        <div className="nova-trust-item">
                            <h5>Featured In</h5>
                            <span className="nova-trust-logo">The Wall Street Journal</span>
                        </div>
                    </div>
                </div>

                {/* Expertise */}
                <section className="nova-section nova-bg-light" id="expertise">
                    <div className="nova-container">
                        <div className="nova-section-header">
                            <h2>Our Areas of Practice</h2>
                            <p>Focused exclusively on employment law, we provide unparalleled expertise in complex workplace disputes.</p>
                        </div>
                        <div className="nova-grid-3">
                            <div className="nova-card">
                                <Icons.Briefcase />
                                <h3>Wrongful Termination</h3>
                                <p>Aggressive representation for employees fired illegally or in violation of public policy, seeking maximum compensation.</p>
                                <a href="#" className="nova-link">Learn More &rarr;</a>
                            </div>
                            <div className="nova-card">
                                <Icons.Shield />
                                <h3>Workplace Discrimination</h3>
                                <p>Protecting victims of discrimination based on age, race, gender, religion, or disability under state and federal law.</p>
                                <a href="#" className="nova-link">Learn More &rarr;</a>
                            </div>
                            <div className="nova-card">
                                <Icons.UserPlus />
                                <h3>Sexual Harassment</h3>
                                <p>Providing a safe, confidential environment to pursue justice against hostile work environments and sexual misconduct.</p>
                                <a href="#" className="nova-link">Learn More &rarr;</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Split Section: Contact Form & Info */}
                <section className="nova-section" id="consultation">
                    <div className="nova-container nova-split">
                        <div className="nova-split-text">
                            <h2>Schedule Your Confidential Case Review.</h2>
                            <p>Time is often critical in employment disputes. Contact our attorneys today to understand your rights and legal options. We operate on a contingency fee basis — you pay nothing unless we win.</p>
                            <ul className="nova-benefits">
                                <li><Icons.Check /> No Upfront Fees</li>
                                <li><Icons.Check /> 100% Confidential</li>
                                <li><Icons.Check /> Aggressive Representation</li>
                                <li><Icons.Check /> Record-Breaking Verdicts</li>
                            </ul>
                        </div>

                        <div className="nova-form-container">
                            {formStatus === 'success' ? (
                                <div className="nova-form-success">
                                    <div className="nova-success-icon"><Icons.Check /></div>
                                    <h3>Request Received</h3>
                                    <p>Our legal team will review your information and contact you within 24 hours.</p>
                                </div>
                            ) : (
                                <form className="nova-form" onSubmit={handleSubmit}>
                                    <h3>Case Evaluation Form</h3>
                                    <div className="nova-form-row">
                                        <div className="nova-input-group">
                                            <input type="text" placeholder="First Name" required />
                                        </div>
                                        <div className="nova-input-group">
                                            <input type="text" placeholder="Last Name" required />
                                        </div>
                                    </div>
                                    <div className="nova-input-group">
                                        <input type="email" placeholder="Email Address" required />
                                    </div>
                                    <div className="nova-input-group">
                                        <input type="tel" placeholder="Phone Number" required />
                                    </div>
                                    <div className="nova-input-group">
                                        <select required>
                                            <option value="">Select Issue Type...</option>
                                            <option value="termination">Wrongful Termination</option>
                                            <option value="harassment">Sexual Harassment</option>
                                            <option value="discrimination">Discrimination</option>
                                            <option value="wage">Wage & Hour Disputes</option>
                                            <option value="other">Other Employment Issue</option>
                                        </select>
                                    </div>
                                    <div className="nova-input-group">
                                        <textarea placeholder="Briefly describe your situation (Do not include sensitive information)" rows="4" required></textarea>
                                    </div>
                                    <button type="submit" className={`nova-btn-solid full-width ${formStatus === 'submitting' ? 'loading' : ''}`} disabled={formStatus === 'submitting'}>
                                        {formStatus === 'submitting' ? 'Sending...' : 'Submit Request'}
                                    </button>
                                    <p className="nova-disclaimer">Submitting this form does not create an attorney-client relationship.</p>
                                </form>
                            )}
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="nova-footer">
                <div className="nova-container nova-footer-grid">
                    <div className="nova-footer-brand">
                        <div className="nova-brand">
                            <Icons.Scale />
                            <div className="nova-brand-text">
                                <strong>Nova Law</strong>
                                <span>Partners</span>
                            </div>
                        </div>
                        <p>Premier employment litigation boutique representing workers nationwide against corporate misconduct.</p>
                    </div>
                    <div className="nova-footer-links">
                        <h4>Practice Areas</h4>
                        <a>Wrongful Termination</a>
                        <a>Discrimination</a>
                        <a>Sexual Harassment</a>
                        <a>Whistleblower</a>
                    </div>
                    <div className="nova-footer-contact">
                        <h4>Contact Us</h4>
                        <p>1200 Avenue of the Americas<br />New York, NY 10036</p>
                        <p>1-800-NOVA-LAW</p>
                        <p>info@novalawpartners.com</p>
                    </div>
                </div>
                <div className="nova-footer-bottom">
                    <div className="nova-container">
                        <p>&copy; 2026 Nova Law Partners LLP. All Rights Reserved. Attorney Advertising. Prior results do not guarantee a similar outcome.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NovaLaw;
