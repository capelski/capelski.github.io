import React from 'react';

interface ProjectProps {
    children?: React.ReactNode;
    date?: string;
    image: string;
    imageOrientation?: 'landscape' | 'portrait';
    repository?: string;
    title: string;
    url?: string;
}

export const Project: React.FC<ProjectProps> = (props) => (
    <div className="project">
        <div className="project-info">
            <h3 className="project-title">{props.title}</h3>
            <div className="project-details">
                {props.date ? <span className="project-date">📅 {props.date}</span> : null}
                {props.repository ? (
                    <a
                        target="_blank"
                        className="project-source"
                        href={`https://github.com/capelski/${props.repository}`}
                    >
                        ⌨️ code
                    </a>
                ) : null}
            </div>
        </div>
        <div className={`project-content ${props.imageOrientation || 'landscape'}`}>
            <div className="project-image-wrapper">
                <img src={`/images/portfolio/${props.image}`} alt={`${props.title} project`} />
                {props.url ? (
                    <a target="_blank" href={`${props.url}`} className="project-demo">
                        ▶️
                    </a>
                ) : null}
            </div>
            <div className="project-description">{props.children ? props.children : null}</div>
        </div>
    </div>
);
