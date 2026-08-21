import React, { useState } from 'react';

const wheelSize = 300;
const wheelSpinDuration = 4000;

/** Styles the tiles need on top of the shared ones, per number of tiles in the wheel */
const tilesConfig: {
    [tiles: number]: {
        oddBackground: string;
        evenBackground: string;
        paddingTop: number;
        textRotation: number;
        textWidth?: string;
    };
} = {
    4: {
        oddBackground: '#0082ff',
        evenBackground: '#f2f2f2',
        paddingTop: 72,
        textRotation: 45
    },
    8: {
        oddBackground: 'linear-gradient(135deg, #0082ff 50%, transparent 50%)',
        evenBackground: 'linear-gradient(135deg, #f2f2f2 50%, transparent 50%)',
        paddingTop: 32,
        textRotation: 25,
        textWidth: '64%'
    },
    12: {
        oddBackground: 'linear-gradient(120deg, #0082ff 36.5%, transparent 36.5%)',
        evenBackground: 'linear-gradient(120deg, #f2f2f2 36.5%, transparent 36.5%)',
        paddingTop: 32,
        textRotation: 15,
        textWidth: '40%'
    }
};

export interface WheelProps {
    tiles: string[];
}

export const Wheel: React.FC<WheelProps> = (props) => {
    const tileDelta = 360 / props.tiles.length;
    const tileCenter = tileDelta / 2;
    const [isAnimated, setIsAnimated] = useState(false);
    const [wheelRotation, setWheelRotation] = useState(tileCenter);

    /* Undefined for tile counts the article does not showcase, same as the wheel not
     * matching any of the per-count css rules it used to rely on */
    const config = tilesConfig[props.tiles.length] as (typeof tilesConfig)[number] | undefined;

    return (
        <React.Fragment>
            <div
                className="wheel"
                style={{
                    border: '1px solid black',
                    borderRadius: wheelSize / 2,
                    height: wheelSize,
                    margin: '32px auto',
                    overflow: 'hidden',
                    position: 'relative',
                    transform: `rotate(${-wheelRotation}deg)`,
                    transition: isAnimated ? `transform ${wheelSpinDuration}ms` : undefined,
                    width: wheelSize
                }}
            >
                {props.tiles.map((tile, index) => {
                    // The first tile is the CSS :nth-child(odd) one
                    const isOdd = index % 2 === 0;

                    return (
                        <div
                            className="wheel-tile"
                            key={index}
                            style={{
                                background: isOdd ? config?.oddBackground : config?.evenBackground,
                                boxSizing: 'border-box',
                                color: isOdd ? '#f2f2f2' : '#0082ff',
                                height: wheelSize / 2,
                                paddingTop: config?.paddingTop,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                transform: `translateX(${-wheelSize / 4}px) translateY(${
                                    wheelSize / 4
                                }px) rotate(${tileDelta * index}deg) translateX(${
                                    wheelSize / 4
                                }px) translateY(${-wheelSize / 4}px)`,
                                width: wheelSize / 2
                            }}
                        >
                            <div
                                className="tile-text"
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    transform: config && `rotate(${config.textRotation}deg)`,
                                    width: config?.textWidth
                                }}
                            >
                                {tile}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="button-wrapper" style={{ marginBottom: 24, textAlign: 'center' }}>
                <button
                    type="button"
                    className={`button primary big ${isAnimated ? 'disabled-button' : ''}`}
                    disabled={isAnimated}
                    onClick={() => {
                        const chosenTile = Math.floor(Math.random() * props.tiles.length);
                        const tileRotation = chosenTile * tileDelta + tileCenter;
                        const fullSpins = 360 * Math.floor(Math.random() * 3 + 1);
                        const nextWheelRotation = fullSpins + tileRotation;
                        setIsAnimated(true);
                        setWheelRotation(nextWheelRotation);

                        setTimeout(() => {
                            setIsAnimated(false);
                            setWheelRotation(nextWheelRotation % 360);
                        }, wheelSpinDuration);
                    }}
                >
                    Spin
                </button>
            </div>
        </React.Fragment>
    );
};
