import { useMediaQuery } from 'react-responsive';

/** Single source of truth for the responsive breakpoints, in pixels */
export const breakpoints = {
    medium: 768,
    large: 992
};

export const useIsMediumUp = () => useMediaQuery({ minWidth: breakpoints.medium });

export const useIsLargeUp = () => useMediaQuery({ minWidth: breakpoints.large });
