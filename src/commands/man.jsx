import { fetchContent } from '../utils/contentFetcher.js';

const MAN_PATH_PREFIX = '/content/man/';
const MAN_PATH_SUFFIX = '.txt';

export default {
    name: 'man',
    description: 'Display the manual page for a command.',

    execute: async (args, _context) => {
        if (args.length === 0) {
            return 'What manual page do you want?';
        }
        const pageName = args[0].toLowerCase();
        const sourcePath = `${MAN_PATH_PREFIX}${pageName}${MAN_PATH_SUFFIX}`;

        try {
            const content = await fetchContent(sourcePath);
            if (!content) {
                return `man: No manual entry for ${pageName}`;
            }
            return (
                <div
                    className='man-output'
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
        } catch (error) {
            console.log(error);
            return `man: No manual entry for ${pageName}`;
        }
    },
};
