import './Testimonials.css';

const feedbacks = [
    {
        name: "Carlos",
        location: "São Paulo, Brazil",
        text: "The editing quality is absolutely top-notch. They perfectly captured the pacing we needed and delivered the videos way faster than we expected. Highly recommended for any serious creator.",
        delay: 1
    },
    {
        name: "Sarah M.",
        location: "Miami, USA",
        text: "Macken transformed our raw footage into a sleek, engaging campaign. Their attention to detail and color grading is what sets them apart.",
        delay: 2
    },
    {
        name: "Elena G.",
        location: "Madrid, Spain",
        text: "Working with them has been a breath of fresh air. They don't just edit; they understand the narrative. The final video was beautiful, dynamic, and exactly what our brand needed to stand out on social media.",
        delay: 3
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials-section" id="testimonials">
            <div className="container">
                <div className="portfolio-header reveal">
                    <h2 className="section-title">What They Say</h2>
                    <p>Feedback from our global partners</p>
                </div>

                <div className="testimonials-grid">
                    {feedbacks.map((f, i) => (
                        <div key={i} className={`testimonial-card hoverable reveal delay-${f.delay}`}>
                            <div className="quote-icon">"</div>
                            <p className="testimonial-text">{f.text}</p>
                            <div className="testimonial-author">
                                <h4>{f.name}</h4>
                                <span>{f.location}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
