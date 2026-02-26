import { useEffect, useRef, useState } from 'react';
import './Contact.css';

const Contact = () => {
    const canvasRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    // Dynamic Abstract Mesh Background Engine
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const config = {
            numPoints: 50,
            connectionDistance: 150,
            pointSpeed: 0.5,
            meshColor: 'rgba(255, 255, 255, 0.05)' // very subtle white
        };

        let points = [];

        // Set dimensions
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // initial setup

        // Initialize Points
        class Point {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * config.pointSpeed;
                this.vy = (Math.random() - 0.5) * config.pointSpeed;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        for (let i = 0; i < config.numPoints; i++) {
            points.push(new Point());
        }

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update Points
            points.forEach(p => p.update());

            // Draw Connections (Mesh)
            ctx.beginPath();
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.connectionDistance) {
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                    }
                }
            }
            ctx.strokeStyle = config.meshColor;
            ctx.stroke();

            // Draw Points (subtle nodes)
            points.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhatsAppSubmit = (e) => {
        e.preventDefault();
        const text = `Hi Macken! My name is ${formData.name}. ${formData.email ? `Email: ${formData.email}. ` : ''}Message: ${formData.message}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/1234567890?text=${encodedText}`; // Placeholder number
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section className="contact-scale" id="contact">
            <canvas ref={canvasRef} className="contact-mesh-canvas"></canvas>

            <div className="container contact-container">
                <div className="contact-content-wrapper">

                    {/* Left Side: Quality / Why Us */}
                    <div className="contact-info-block reveal">
                        <h2 className="section-title">Scale Your Agency.</h2>
                        <p className="contact-subtitle">
                            We operate as your elite white-label design, development, and video post-production partner. High-end delivery, zero friction.
                        </p>

                        <div className="quality-grid">
                            <div className="quality-card hoverable">
                                <div className="q-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                </div>
                                <h4>Premium Quality</h4>
                                <p>Uncompromising aesthetic standards across code, UI design, and motion.</p>
                            </div>

                            <div className="quality-card hoverable">
                                <div className="q-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                </div>
                                <h4>High-End Video</h4>
                                <p>Cinematic editing, dynamic motion graphics, and top-tier post-production.</p>
                            </div>

                            <div className="quality-card hoverable">
                                <div className="q-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </div>
                                <h4>Rapid Turnaround</h4>
                                <p>Agile deployment systems built for modern agency speeds.</p>
                            </div>

                            <div className="quality-card hoverable">
                                <div className="q-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                </div>
                                <h4>Strict NDA</h4>
                                <p>100% white-label. We remain invisible to your end-clients.</p>
                            </div>

                            <div className="quality-card hoverable">
                                <div className="q-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                </div>
                                <h4>Scalable Tech</h4>
                                <p>React, Next.js, and modern front-end stacks built for massive impact.</p>
                            </div>

                            <div className="quality-card hoverable">
                                <div className="q-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                </div>
                                <h4>UX/UI Design</h4>
                                <p>Crafting intuitive and immersive user journeys built to convert.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Instagram Link */}
                    <div className="contact-form-block reveal delay-2">
                        <div className="form-glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', textAlign: 'center' }}>
                            <h3>Let's talk business</h3>
                            <p style={{ marginBottom: '2rem' }}>Send us a direct message on Instagram to get started.</p>

                            <a href="https://www.instagram.com/mackenagency/" target="_blank" rel="noopener noreferrer" className="btn btn-primary hoverable" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '1rem 2rem', textDecoration: 'none' }}>
                                <span>Message on Instagram</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
