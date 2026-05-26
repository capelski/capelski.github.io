import React from 'react';

export interface ObjectViewProps {
    object: any;
}

export const ObjectView: React.FC<ObjectViewProps> = (props) => {
    return <ObjectViewRecursive isArrayMember={false} level={0} object={props.object} />;
};

interface ObjectViewRecursiveProps {
    isArrayMember: boolean;
    level: number;
    object: any;
}

const ObjectViewRecursive: React.FC<ObjectViewRecursiveProps> = (props) => {
    const isArray = Array.isArray(props.object);
    const isString = typeof props.object === 'string';
    const isBoolean = typeof props.object === 'boolean';
    const isUndefined = props.object === undefined;
    const isNull = props.object === null;
    const isObject = !isNull && typeof props.object === 'object';

    const indentation = '\u00A0\u00A0';
    const currentIndentation = indentation.repeat(props.level);
    const nextLevel = props.level + 1;
    const nextIndentation = indentation.repeat(nextLevel);
    const isRootObject = props.level === 0;

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
                Object.keys(props.object).map((key) => {
                    return (
                        <React.Fragment key={key}>
                            {nextIndentation}
                            {!isArray && <React.Fragment>"{key}": </React.Fragment>}
                            <ObjectViewRecursive
                                isArrayMember={isArray}
                                level={nextLevel}
                                object={props.object[key]}
                            />
                        </React.Fragment>
                    );
                })
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
                    {props.isArrayMember && ','}
                    <br />
                </React.Fragment>
            )}

            {isArray ? (
                <React.Fragment>
                    {currentIndentation}
                    {']'}
                    {!isRootObject && <br />}
                </React.Fragment>
            ) : isObject ? (
                <React.Fragment>
                    {currentIndentation}
                    {'}'}
                    {props.isArrayMember && ','}
                    {!isRootObject && <br />}
                </React.Fragment>
            ) : undefined}
        </React.Fragment>
    );
};
