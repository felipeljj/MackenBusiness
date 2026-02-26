import { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const outlineRef = useRef(null);

    useEffect(() => {
        // Check if device supports hover (not a touchscreen)
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            if (dotRef.current) {
                dotRef.current.style.left = `${clientX}px`;
                dotRef.current.style.top = `${clientY}px`;
            }

            if (outlineRef.current) {
                outlineRef.current.animate({
                    left: `${clientX}px`,
                    top: `${clientY}px`
                }, { duration: 500, fill: "forwards" });
            }
        };

        let isHovering = false;

        const addHoverEffect = () => {
            document.querySelectorAll('.hoverable, a, button').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    isHovering = true;
                    if (outlineRef.current) {
                        outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
                        outlineRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }
                });
                el.addEventListener('mouseleave', () => {
                    isHovering = false;
                    if (outlineRef.current) {
                        outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
                        outlineRef.current.style.backgroundColor = 'transparent';
                    }
                });
            });
        };

        const onMouseDown = () => {
            if (outlineRef.current && !isHovering) {
                outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.4)';
            } else if (outlineRef.current && isHovering) {
                outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.9)'; // 1.5 + 40% roughly
            }
        };

        const onMouseUp = () => {
            if (outlineRef.current && !isHovering) {
                outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
            } else if (outlineRef.current && isHovering) {
                outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        // Add hover effect after render
        setTimeout(addHoverEffect, 500);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    if (!window.matchMedia("(pointer: fine)").matches) return null;

    return (
        <>
            <div
                ref={dotRef}
                className="cursor-dot"
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    transform: 'translate(-50%, -50%)',
                    width: '8px', height: '8px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference'
                }}
            />
            <div
                ref={outlineRef}
                className="cursor-outline"
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    transform: 'translate(-50%, -50%)',
                    width: '40px', height: '40px',
                    border: '1px solid white',
                    borderRadius: '50%',
                    transition: 'width 0.2s, height 0.2s, background-color 0.2s, transform 0.2s',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference'
                }}
            />
        </>
    );
};

export default CustomCursor;
