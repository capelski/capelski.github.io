import React from 'react';

export interface ObjectViewProps {
    object: any;
}

export const ObjectView: React.FC<ObjectViewProps> = (props) => {
    return <ObjectViewRecursive parentPrefix="" object={props.object} />;
};

interface ObjectViewRecursiveProps {
    parentPrefix: string;
    object: any;
}

const ObjectViewRecursive: React.FC<ObjectViewRecursiveProps> = (props) => {
    const isArray = Array.isArray(props.object);
    const isString = typeof props.object === 'string';
    const isBoolean = typeof props.object === 'boolean';
    const isUndefined = props.object === undefined;
    const isNull = props.object === null;
    const isObject = !isNull && typeof props.object === 'object';

    return (
        <React.Fragment>
            {isArray ? (
                <React.Fragment>
                    {'['}
                    <br />
                </React.Fragment>
            ) : isObject ? (
                <React.Fragment>
                    {'{'}
                    <br />
                </React.Fragment>
            ) : undefined}

            {isObject ? (
                (() => {
                    const nextParentPrefix = `${props.parentPrefix}\u00A0\u00A0\u00A0`;
                    return Object.keys(props.object).map((key) => {
                        return (
                            <React.Fragment key={key}>
                                {nextParentPrefix}
                                {!isArray && <React.Fragment>"{key}": </React.Fragment>}
                                <ObjectViewRecursive
                                    parentPrefix={nextParentPrefix}
                                    object={props.object[key]}
                                />
                            </React.Fragment>
                        );
                    });
                })()
            ) : (
                <React.Fragment>
                    {isString && '"'}
                    {isBoolean
                        ? props.object === true
                            ? 'true'
                            : 'false'
                        : isUndefined
                        ? 'undefined'
                        : isNull
                        ? 'null'
                        : props.object}
                    {isString && '"'}
                    <br />
                </React.Fragment>
            )}

            {isArray ? (
                <React.Fragment>
                    {props.parentPrefix}
                    {']'}
                    <br />
                </React.Fragment>
            ) : isObject ? (
                <React.Fragment>
                    {props.parentPrefix}
                    {'}'}
                    <br />
                </React.Fragment>
            ) : undefined}
        </React.Fragment>
    );
};
