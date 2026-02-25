import { useState } from 'react';
import './CanadaMovers.css';

const Icons = {
    Leaf: () => (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#D80621" stroke="none">
            <path d="M12 2C8 6 6 8.5 6 12C6 14.2 7.8 16 10 16H10.5L9.5 22H14.5L13.5 16H14C16.2 16 18 14.2 18 12C18 8.5 16 6 12 2Z"></path>
            <path d="M12 2L9 8H3L6 14L4 20L12 16L20 20L18 14L21 8H15L12 2Z" fill="#D80621"></path>
        </svg>
    ),
    Plane: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 5-3 3-3-1v2l4 2 2 4h2l-1-3 3-3 5 6l1.2-.7c.4-.2.7-.6.6-1.1z"></path>
        </svg>
    ),
    Check: () => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    ),
    Doc: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
    ),
    Shield: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
        </svg>
    )
};

const CanadaMovers = () => {
    const [formState, setFormState] = useState({ name: '', email: '', phone: '', program: 'Express Entry' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Fake API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormState({ name: '', email: '', phone: '', program: 'Express Entry' });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        }, 1500);
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <div className="canada-app">
            {/* Header */}
            <header className="can-header">
                <div className="can-container can-header-inner">
                    <div className="can-logo">
                        <Icons.Leaf />
                        <span>TrueNorth Immigration</span>
                    </div>
                    <nav className="can-nav">
                        <a href="#services">Services</a>
                        <a href="#about">About Us</a>
                        <a href="#testimonials">Success Stories</a>
                        <button className="can-btn-primary small" onClick={() => document.getElementById('assessment').scrollIntoView({ behavior: 'smooth' })}>
                            Free Assessment
                        </button>
                    </nav>
                </div>
            </header>

            <main>
                {/* Hero / About Section */}
                <section className="can-hero" id="about">
                    <div className="can-hero-bg">
                        <div className="can-hero-overlay"></div>
                    </div>
                    <div className="can-container can-hero-content">
                        <div className="can-hero-text reveal">
                            <div className="can-badge">Regulated Canadian Immigration Consultants (RCIC)</div>
                            <h1>Your Journey to Canada Starts Here.</h1>
                            <p>Expert guidance for Express Entry, Provincial Nominees, Study Permits, and Family Sponsorships. We make your Canadian dream a reality based in Vancouver, BC.</p>
                            <div className="can-hero-actions">
                                <button className="can-btn-primary" onClick={() => document.getElementById('assessment').scrollIntoView({ behavior: 'smooth' })}>
                                    Start Free Assessment
                                </button>
                                <button className="can-btn-secondary">
                                    <Icons.Plane /> Explore Programs
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="can-features" id="services">
                    <div className="can-container">
                        <div className="can-section-header reveal">
                            <h2>Why Choose TrueNorth?</h2>
                            <p>We provide end-to-end support for your immigration journey with transparency and high success rates.</p>
                        </div>

                        <div className="can-grid-3">
                            <div className="can-card reveal delay-1">
                                <div className="can-icon-wrapper"><Icons.Doc /></div>
                                <h3>Visa & Permits</h3>
                                <p>Comprehensive support for Study Visas, Work Permits, and Permanent Residency applications.</p>
                            </div>
                            <div className="can-card reveal delay-2">
                                <div className="can-icon-wrapper"><Icons.Shield /></div>
                                <h3>RCIC Certified</h3>
                                <p>Our consultants are fully licensed and registered with the ICCRC to represent your case legally.</p>
                            </div>
                            <div className="can-card reveal delay-3">
                                <div className="can-icon-wrapper"><Icons.Check /></div>
                                <h3>High Success Rate</h3>
                                <p>With over 2,000 successful cases, our meticulous approach minimizes refusal risks.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="can-testimonials" id="testimonials" style={{ padding: '80px 0', backgroundColor: '#f0f4f8' }}>
                    <div className="can-container">
                        <div className="can-section-header reveal">
                            <h2>Success Stories</h2>
                            <p>Hear from people who made their Canadian dream a reality with us.</p>
                        </div>
                        <div className="can-grid-3">
                            <div className="can-card reveal delay-1">
                                <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>"TrueNorth made my Express Entry process seamless. I received my ITA in just 3 months!"</p>
                                <h4>- Maria S., Brazil</h4>
                            </div>
                            <div className="can-card reveal delay-2">
                                <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>"Their attention to detail with my study permit was outstanding. I am now studying in Toronto!"</p>
                                <h4>- Raj P., India</h4>
                            </div>
                            <div className="can-card reveal delay-3">
                                <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>"Thanks to their team, my family sponsorship was approved without any delays."</p>
                                <h4>- Elena G., Mexico</h4>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Proof & Form Section */}
                <section className="can-assessment" id="assessment">
                    <div className="can-container can-assessment-grid">
                        <div className="can-assessment-info reveal">
                            <h2>Take the first step towards your new life.</h2>
                            <p>Fill out our free assessment form to discover your eligibility for various Canadian immigration programs. One of our specialists will contact you within 24 hours.</p>

                            <div className="can-family-img">
                                <div className="can-img-box"></div>
                            </div>

                            <div className="can-stats">
                                <div className="can-stat">
                                    <h4>10+</h4>
                                    <span>Years Experience</span>
                                </div>
                                <div className="can-stat">
                                    <h4>2K+</h4>
                                    <span>Visas Approved</span>
                                </div>
                            </div>
                        </div>

                        <div className="can-form-wrapper reveal delay-2">
                            <div className="can-form-card">
                                <h3>Free Eligibility Assessment</h3>

                                {isSuccess ? (
                                    <div className="can-success-state">
                                        <div className="success-circle">
                                            <Icons.Check />
                                        </div>
                                        <h4>Assessment Submitted!</h4>
                                        <p>Thank you, {formState.name || 'there'}. Our team will review your profile and contact you via email shortly.</p>
                                    </div>
                                ) : (
                                    <form className="can-form" onSubmit={handleSubmit}>
                                        <div className="can-input-group">
                                            <label htmlFor="name">Full Name</label>
                                            <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required placeholder="John Doe" />
                                        </div>

                                        <div className="can-input-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required placeholder="john@example.com" />
                                        </div>

                                        <div className="can-input-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input type="tel" id="phone" name="phone" value={formState.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" />
                                        </div>

                                        <div className="can-input-group">
                                            <label htmlFor="program">Immigration Program of Interest</label>
                                            <select id="program" name="program" value={formState.program} onChange={handleChange}>
                                                <option value="Express Entry">Express Entry (Skilled Worker)</option>
                                                <option value="Study Permit">Study Visa / Permit</option>
                                                <option value="Work Permit">Work Permit</option>
                                                <option value="Family Sponsorship">Family Sponsorship</option>
                                                <option value="Not Sure">Not Sure / Evaluate My Options</option>
                                            </select>
                                        </div>

                                        <button type="submit" className={`can-btn-primary full-width ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                                            {isSubmitting ? 'Submitting...' : 'Find Out If You Qualify'}
                                        </button>
                                        <p className="can-secure-text"><Icons.Shield /> Your data is secure and confidential.</p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="can-footer">
                <div className="can-container">
                    <div className="can-logo light">
                        <Icons.Leaf />
                        <span>TrueNorth Immigration</span>
                    </div>
                    <p>&copy; 2026 TrueNorth Immigration Services. All rights reserved.</p>
                    <p style={{ marginTop: '8px', fontSize: '0.75rem', opacity: 0.6 }}>Design Mockup for Portfolio.</p>
                </div>
            </footer>
        </div>
    );
};

export default CanadaMovers;
