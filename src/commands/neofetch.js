import { fetchContent } from '../utils/contentFetcher.js';

const NEOfETCH_SOURCE = '/public/content/neofetch.txt';

export default {
    name: 'neofetch',
    description: 'Display system information.',

    execute: async (_args, _context) => {
        try {
            const content = await fetchContent(NEOfETCH_SOURCE);
            return `<pre>${content}</pre>`;
        } catch (error) {
            return `Error: Could not load neofetch content. ${error.message}`;
        }
    },
};
