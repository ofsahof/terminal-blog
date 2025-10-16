import { ascii, info } from '../../content/neofetch';

export default {
  name: 'neofetch',
  description: 'Display system and user information.',
  execute: () => {
    const currentTheme = localStorage.getItem('terminal-theme') || 'gruvbox';
    const dynamicInfo = { ...info, 'Theme': currentTheme };

    const logoLines = ascii.split('\n');
    const infoLines = Object.entries(dynamicInfo).map(
      ([key, value]) => `<span class="neofetch-key">${key}:</span> ${value}`
    );

    let output = '';
    const maxLines = Math.max(logoLines.length, infoLines.length);

    for (let i = 0; i < maxLines; i++) {
      const logoLine = logoLines[i] || '';
      const infoLine = infoLines[i] || '';
      output += `<div><span class="neofetch-logo">${logoLine.padEnd(30)}</span>${infoLine}</div>`;
    }
    return `<div class="neofetch-container">${output}</div>`;
  },
};