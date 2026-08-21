import React from 'react';
import { ArticleId } from '../article-id';

const resourceImageStyle: React.CSSProperties = { maxWidth: 200 };

interface PersuasionHeaderProps {
    description: string;
    image: string;
    imageAlt: string;
    title: string;
}

export const PersuasionHeader: React.FC<PersuasionHeaderProps> = (props) => (
    <div className="persuasion-header">
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
        <img
            src={`/images/blog/${ArticleId.persuasionInPictures}/${props.image}`}
            alt={props.imageAlt}
        />
    </div>
);

interface PersuasionStageProps {
    description: string;
    image: string;
    title: string;
}

export const PersuasionStage: React.FC<PersuasionStageProps> = (props) => (
    <div className="persuasion-resource">
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

interface PersuasionResourceProps extends PersuasionStageProps {
    imageAlt: string;
}

export const PersuasionResource: React.FC<PersuasionResourceProps> = (props) => (
    <div className="persuasion-resource">
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
