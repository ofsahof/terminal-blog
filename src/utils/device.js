const SMALL_SCREEN_QUERY = '(max-width: 768px)';

const safeMatchMedia = (query) => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false;
    }
    try {
        return window.matchMedia(query).matches;
    } catch (_error) {
        return false;
    }
};

export const isSmallScreen = () => safeMatchMedia(SMALL_SCREEN_QUERY);

export const isTouchOnlyDevice = () => {
    if (typeof window === 'undefined') return false;
    const hasTouch =
        'ontouchstart' in window ||
        (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
    const noFinePointer = safeMatchMedia('(hover: none) and (pointer: coarse)');
    return Boolean(hasTouch && noFinePointer);
};

export const isKeyboardLimited = () => isSmallScreen() || isTouchOnlyDevice();
