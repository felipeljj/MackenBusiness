import { useEffect, useState, useRef } from 'react';
import './Stats.css';

const StatItem = ({ end, label, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const duration = 2000; // 2 seconds
        const incrementTime = 20;
        const steps = duration / incrementTime;
        const stepValue = end / steps;

        const timer = setInterval(() => {
            start += stepValue;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [end, isVisible]);

    return (
        <div className="stat-item" ref={ref}>
            <h3 className="stat-number">
                {count}
                <span className="stat-suffix">{suffix}</span>
            </h3>
            <p className="stat-label">{label}</p>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-header reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title">Qualidade construída em cada entrega</h2>
                </div>
                <div className="stats-container">
                    <StatItem end={100} label="Clientes no mundo todo" suffix="+" />
                    <div className="stat-divider"></div>
                    <StatItem end={1200} label="Vídeos entregues" suffix="+" />
                    <div className="stat-divider"></div>
                    <StatItem end={5} label="Sites entregues" suffix="+" />
                    <div className="stat-divider"></div>
                    <StatItem end={2} label="Apps entregues" suffix="+" />
                </div>
            </div>
        </section>
    );
};

export default Stats;
