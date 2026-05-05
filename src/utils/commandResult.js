export const resultTypes = {
    TEXT: 'text',
    COMPONENT: 'component',
    PATH_UPDATE: 'path-update',
    VIEW_CHANGE: 'view-change',
    CLEAR: 'clear',
    THEME_CHANGE: 'theme-change',
    ERROR: 'error',
};

export const asTextResult = (value) => ({
    type: resultTypes.TEXT,
    content: value,
});

export const asComponentResult = (value) => ({
    type: resultTypes.COMPONENT,
    content: value,
});

export const asErrorResult = (value) => ({
    type: resultTypes.ERROR,
    content: value,
});

export const asPathUpdateResult = (newPath) => ({
    type: resultTypes.PATH_UPDATE,
    newPath,
});

export const asViewChangeResult = (newView, gameName, props = {}) => ({
    type: resultTypes.VIEW_CHANGE,
    newView,
    gameName,
    props,
});

export const asClearResult = () => ({
    type: resultTypes.CLEAR,
});

export const asThemeChangeResult = (themeName) => ({
    type: resultTypes.THEME_CHANGE,
    themeName,
});
