import React from 'react';
import { useIsMediumUp } from '../breakpoints';

/** Lays out the children side by side, sharing the available width evenly, from the medium
 * breakpoint upwards; below it the children are simply stacked one after the other
 */
export const ScreenSplitter: React.FC<React.PropsWithChildren> = (props) => {
    const isMediumUp = useIsMediumUp();

    return (
        <div
            className="screen-splitter"
            style={{
                alignItems: 'center',
                display: isMediumUp ? 'flex' : 'block'
            }}
        >
            {React.Children.map(props.children, (child) => (
                <div style={isMediumUp ? { flexGrow: 1, margin: '0 5px' } : undefined}>{child}</div>
            ))}
        </div>
    );
};
