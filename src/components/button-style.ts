import React from 'react';

/** Primary brand color */
export const primaryColor = '#fed136';

/** 45% white mixed into the primary color */
const disabledColor = '#fee690';

export interface ButtonStyleOptions {
    big?: boolean;
    disabled?: boolean;
}

/** Styles of the buttons rendered across the app and the article contents */
export const buttonStyle = (options: ButtonStyleOptions = {}): React.CSSProperties => ({
    backgroundColor: options.disabled ? disabledColor : primaryColor,
    border: 'none',
    borderRadius: 8,
    color: 'white',
    cursor: options.disabled ? undefined : 'pointer',
    fontFamily: 'inherit',
    fontSize: options.big ? 20 : 16,
    fontWeight: 700,
    lineHeight: options.big ? '28px' : '20px',
    outline: 'none',
    padding: '8px 16px'
});
