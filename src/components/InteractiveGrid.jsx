import { useRef, useEffect } from 'react';

const InteractiveGrid = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = window.innerWidth;
        let height = window.innerHeight;

        let particles = [];
        const mouse = { x: -1000, y: -1000, radius: 180 };

        const initParticles = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            particles = [];

            // Determine particle density based on screen size
            const numberOfParticles = Math.max(60, Math.floor((width * height) / 12000));

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4, // Slow, elegant movement
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 1.5 + 0.5 // Random tiny sizes
                });
            }
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', initParticles);
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        initParticles();

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 0.5;

            // Update & Draw Particles
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges smoothly
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse interaction - gentle repulsion to create dynamic polygons
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    // Milder push for elegance
                    const directionX = forceDirectionX * force * 1.5;
                    const directionY = forceDirectionY * force * 1.5;

                    p.x -= directionX;
                    p.y -= directionY;
                }

                // Draw Particle Dots
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // Connect particles to each other (the Polygon effect)
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    const diffX = p.x - p2.x;
                    const diffY = p.y - p2.y;
                    const distToParticle = Math.sqrt(diffX * diffX + diffY * diffY);

                    if (distToParticle < 140) {
                        ctx.beginPath();
                        // Opacity fades out the further they are
                        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distToParticle / 140) * 0.3})`;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Connect particles to the mouse
                if (distance < mouse.radius) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / mouse.radius) * 0.4})`;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', initParticles);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fade-in-grid"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

export default InteractiveGrid;
