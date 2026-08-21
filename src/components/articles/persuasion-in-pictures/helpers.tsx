import React from 'react';
import { ArticleId } from '../article-id';
import { useIsMediumUp } from '../../breakpoints';

const resourceImageStyle: React.CSSProperties = { maxWidth: 200 };

const resourceStyle = (isMediumUp: boolean): React.CSSProperties => ({
    paddingRight: isMediumUp ? 16 : undefined,
    textAlign: 'center'
});

interface PersuasionHeaderProps {
    description: string;
    image: string;
    imageAlt: string;
    title: string;
}

export const PersuasionHeader: React.FC<PersuasionHeaderProps> = (props) => {
    const isMediumUp = useIsMediumUp();

    return (
        <div className="persuasion-header">
            <div>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
            <img
                src={`/images/blog/${ArticleId.persuasionInPictures}/${props.image}`}
                alt={props.imageAlt}
                style={{
                    display: 'block',
                    margin: 'auto',
                    maxWidth: isMediumUp ? 150 : '100%'
                }}
            />
        </div>
    );
};

interface PersuasionStageProps {
    description: string;
    image: string;
    title: string;
}

export const PersuasionStage: React.FC<PersuasionStageProps> = (props) => {
    const isMediumUp = useIsMediumUp();

    return (
        <div className="persuasion-resource" style={resourceStyle(isMediumUp)}>
            <img
                className="persuasion-resource-image"
                src={`/images/blog/${ArticleId.persuasionInPictures}/${props.image}`}
                alt={`${props.image.split('.')[0]} representation`}
                style={resourceImageStyle}
            />
            <h4>{props.title}</h4>
            <p>{props.description}</p>
        </div>
    );
};

interface PersuasionResourceProps extends PersuasionStageProps {
    imageAlt: string;
}

export const PersuasionResource: React.FC<PersuasionResourceProps> = (props) => {
    const isMediumUp = useIsMediumUp();

    return (
        <div className="persuasion-resource" style={resourceStyle(isMediumUp)}>
            <h4>{props.title}</h4>
            <img
                className="persuasion-resource-image"
                src={`/images/blog/${ArticleId.persuasionInPictures}/${props.image}`}
                alt={props.imageAlt}
                style={resourceImageStyle}
            />
            <p>{props.description}</p>
        </div>
    );
};
