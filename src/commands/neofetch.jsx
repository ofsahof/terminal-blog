import { fetchContent } from '../utils/contentFetcher.js';

const NEOfETCH_SOURCE = '/content/neofetch.txt';

const parseNeofetchLine = (line, index) => {
    const parts = line.split(':');
    if (parts.length >= 2 && line.includes(':')) {
        const key = parts[0];
        const value = parts.slice(1).join(':').trim();
        return (
            <div key={index} className='neofetch-output__line'>
                <span className='neofetch-output__key'>{key}:</span>
                <span className='neofetch-output__value'> {value}</span>
            </div>
        );
    } else {
        return (
            <div key={index} className='neofetch-output__line'>
                <span className='neofetch-output__ascii'>{line}</span>
            </div>
        );
    }
};

export default {
    name: 'neofetch',
    description: 'Display system information.',

    execute: async (_args, _context) => {
        try {
            const content = await fetchContent(NEOfETCH_SOURCE);
            const lines = content.split('\n');
            return (
                <div className='neofetch-output'>
                    {lines.map(parseNeofetchLine)}
                </div>
            );
        } catch (error) {
            return `Error: Could not load neofetch content. ${error.message}`;
        }
    },
};
