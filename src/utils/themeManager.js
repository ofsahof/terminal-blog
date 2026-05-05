const DEFAULT_THEME = 'dracula';
const THEME_STORAGE_KEY = 'terminal-theme';

export const getStoredTheme = () => {
    return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
};

export const applyTheme = (themeName) => {
    document.body.className = `theme-${themeName}`;
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
};

export const initializeTheme = () => {
    applyTheme(getStoredTheme());
};

export const availableThemes = ['gruvbox', 'solarized', 'dracula'];
