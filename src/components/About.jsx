import './About.css';

const About = () => {
    return (
        <section className="about" id="about">
            <div className="container layout-grid">
                <div className="about-text reveal">
                    <h2 className="section-title">Who we are</h2>
                    <p className="lead">We operate in the shadows so your agency can shine in the spotlight.</p>
                    <p>MACKEN was founded by <strong>Fabio Souza</strong> and <strong>Felipe Latchuk</strong> with a singular vision: to be the ultimate secret weapon for ambitious agencies. We handle the heavy lifting of high-end design, development, and strategy, completely white-labeled.</p>
                </div>
                <div className="founders-grid reveal delay-1">
                    <div className="founder-card hoverable">
                        <div className="founder-image">
                            <img src="/fabio.png" alt="Fabio Souza" />
                        </div>
                        <h3>Fabio Souza</h3>
                        <p>Founder & Head of Video Editing</p>
                    </div>
                    <div className="founder-card hoverable">
                        <div className="founder-image">
                            <img src="/felipe.png" alt="Felipe Latchuk" />
                        </div>
                        <h3>Felipe Latchuk</h3>
                        <p>Co-Founder & Head of DEV</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
