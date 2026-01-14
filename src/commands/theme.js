const availableThemes = ['gruvbox', 'solarized', 'dracula'];

export default {
    name: 'theme',
    description: `Change the color scheme. Available: ${availableThemes.join(', ')}.`,
    execute: (args) => {
        if (args.length === 0) {
            const currentTheme =
                localStorage.getItem('terminal-theme') || 'dracula';
            return `Usage: theme [theme_name]\nAvailable: ${availableThemes.join(', ')}\nCurrent: ${currentTheme}`;
        }
        const themeName = args[0].toLowerCase();
        if (availableThemes.includes(themeName)) {
            document.body.className = `theme-${themeName}`;
            localStorage.setItem('terminal-theme', themeName);
            return `Theme changed to ${themeName}.`;
        }
        return `Error: Theme "${themeName}" not found.`;
    },
};
