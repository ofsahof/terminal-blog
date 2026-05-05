import { asThemeChangeResult, asTextResult } from '../utils/commandResult';
import { availableThemes, getStoredTheme } from '../utils/themeManager';

export default {
    name: 'theme',
    description: `Change the color scheme. Available: ${availableThemes.join(', ')}.`,
    execute: (args) => {
        if (args.length === 0) {
            const currentTheme = getStoredTheme();
            return asTextResult(
                `Usage: theme [theme_name]\nAvailable: ${availableThemes.join(', ')}\nCurrent: ${currentTheme}`
            );
        }
        const themeName = args[0].toLowerCase();
        if (availableThemes.includes(themeName)) {
            return asThemeChangeResult(themeName);
        }
        return asTextResult(`Error: Theme "${themeName}" not found.`);
    },
};
