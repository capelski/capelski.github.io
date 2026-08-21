import React from 'react';
import { useIsLargeUp, useIsMediumUp } from './breakpoints';

interface ProjectProps {
    children?: React.ReactNode;
    date?: string;
    image: string;
    imageOrientation?: 'landscape' | 'portrait';
    repository?: string;
    title: string;
    url?: string;
}

export const Project: React.FC<ProjectProps> = (props) => {
    const isMediumUp = useIsMediumUp();
    const isLargeUp = useIsLargeUp();
    const isPortrait = props.imageOrientation === 'portrait';

    const halfWidth = isLargeUp && isPortrait ? '50%' : undefined;

    return (
        <div
            className="project"
            style={{ paddingBottom: 24, paddingRight: isMediumUp ? 24 : undefined }}
        >
            <div
                className="project-info"
                style={{
                    alignItems: 'flex-end',
                    display: 'flex',
                    height: 32,
                    justifyContent: 'space-between'
                }}
            >
                <h3 className="project-title" style={{ margin: 0 }}>
                    {props.title}
                </h3>
                <div className="project-details">
                    {props.date ? (
                        <span className="project-date" style={{ paddingRight: 8 }}>
                            📅 {props.date}
                        </span>
                    ) : null}
                    {props.repository ? (
                        <a
                            target="_blank"
                            className="project-source"
                            href={`https://github.com/capelski/${props.repository}`}
                            style={{ color: 'black', textDecoration: 'none' }}
                        >
                            ⌨️ code
                        </a>
                    ) : null}
                </div>
            </div>
            <div
                className={`project-content ${props.imageOrientation || 'landscape'}`}
                style={{
                    display: isLargeUp ? 'flex' : undefined,
                    flexDirection: isLargeUp ? (isPortrait ? 'row' : 'column') : undefined
                }}
            >
                <div
                    className="project-image-wrapper"
                    style={{
                        marginLeft: isPortrait ? 'auto' : undefined,
                        marginRight: isLargeUp && isPortrait ? 16 : isPortrait ? 'auto' : undefined,
                        marginTop: 16,
                        maxWidth: halfWidth || (isPortrait ? 250 : undefined),
                        position: 'relative',
                        width: halfWidth
                    }}
                >
                    <img
                        src={`/images/portfolio/${props.image}`}
                        alt={`${props.title} project`}
                        style={{
                            // Grey box as a placeholder for image loading errors
                            backgroundColor: '#f2f2f2',
                            border: '1px solid black',
                            boxSizing: 'border-box',
                            display: 'inline-block',
                            maxWidth: '100%',
                            minHeight: 200,
                            width: '100%'
                        }}
                    />
                    {props.url ? (
                        <a
                            target="_blank"
                            href={`${props.url}`}
                            className="project-demo"
                            style={{
                                alignItems: 'center',
                                bottom: 0,
                                display: 'flex',
                                fontSize: 24,
                                justifyContent: 'center',
                                left: 0,
                                position: 'absolute',
                                right: 0,
                                textDecoration: 'none',
                                top: 0
                            }}
                        >
                            ▶️
                        </a>
                    ) : null}
                </div>
                <div
                    className="project-description"
                    style={{ maxWidth: halfWidth, width: halfWidth }}
                >
                    {props.children ? props.children : null}
                </div>
            </div>
        </div>
    );
};
