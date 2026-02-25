import { useEffect } from 'react';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Custom cursor fix for absolute children
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.querySelectorAll('.app-cursor').forEach(el => el.style.display = 'block');
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="project-modal-overlay">
            <button className="project-modal-close" onClick={onClose}>
                ✕ BACK TO PORTFOLIO
            </button>
            <div className="project-modal-content">
                {children}
            </div>
        </div>
    );
};

export default ProjectModal;
