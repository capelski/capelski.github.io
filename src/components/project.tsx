import React from 'react';

interface ProjectProps {
    date?: string;
    image: string;
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
                        ⌨️ source
                    </a>
                ) : null}
            </div>
        </div>
        <div className="project-image-wrapper">
            <img src={`/images/portfolio/${props.image}`} alt={`${props.title} project`} />
            {props.url ? (
                <a
                    target="_blank"
                    href={`${process.env.PRODUCTION_URL_BASE}${props.url}`}
                    className="project-demo"
                >
                    ▶️
                </a>
            ) : null}
        </div>
        {props.children ? props.children : null}
    </div>
);
