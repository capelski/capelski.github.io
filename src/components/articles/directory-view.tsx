import React from 'react';

export interface DirectoryStructure {
    [key: string]: boolean | DirectoryStructure;
}

export interface DirectoryViewProps {
    directoryName?: string;
    structure: DirectoryStructure;
}

export const DirectoryView: React.FC<DirectoryViewProps> = (props) => {
    return (
        <React.Fragment>
            {props.directoryName || 'root'}
            <br />
            <DirectoryViewRecursive parentPrefix="" structure={props.structure} />
        </React.Fragment>
    );
};

interface DirectoryViewRecursiveProps {
    parentPrefix: string;
    structure: DirectoryStructure;
}

const DirectoryViewRecursive: React.FC<DirectoryViewRecursiveProps> = (props) => {
    const keys = Object.keys(props.structure);

    return (
        <React.Fragment>
            {keys.map((key, index) => {
                const property = props.structure[key];
                const isDirectory = typeof property === 'object';
                const isLastProperty = index === keys.length - 1;
                const nextParentPrefix = `${props.parentPrefix}${
                    isLastProperty && isDirectory ? '\u00A0\u00A0\u00A0' : '|\u00A0\u00A0'
                }`;

                return (
                    <React.Fragment key={key}>
                        {props.parentPrefix}
                        {isDirectory ? '📂\u00A0' : '📝\u00A0'}
                        {key}
                        <br />
                        {typeof property === 'object' ? (
                            <DirectoryViewRecursive
                                parentPrefix={nextParentPrefix}
                                structure={property}
                            />
                        ) : undefined}
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
};
