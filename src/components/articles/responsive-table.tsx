import React, { CSSProperties } from 'react';

export type ResponsiveTableProps<T extends Array<string>> = {
    /** When set to true the first row is not rendered in bold. Defaults to false */
    headerless?: boolean;
    rows: T[];
};

export function ResponsiveTable<T extends Array<string>>(props: ResponsiveTableProps<T>) {
    const [headers, ...body] = props.rows;

    const blockStyle: CSSProperties = {
        display: 'block'
    };

    const responsiveStyle: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${props.rows[0]?.length || 0}, 1fr)`,
        textAlign: 'center',
        gap: 10,
        marginBottom: 10
    };

    return (
        <table style={blockStyle}>
            <thead style={blockStyle}>
                <tr style={responsiveStyle}>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            style={{ fontWeight: props.headerless ? 'normal' : 'bold' }}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody style={blockStyle}>
                {body.map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex} style={responsiveStyle}>
                            {row.map((cell, cellIndex) => (
                                <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
