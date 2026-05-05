import { fetchContent } from '../utils/contentFetcher.js';
import ContentRenderer from '../components/ContentRenderer';

const MAN_PATH_PREFIX = '/content/man/';
const MAN_PATH_SUFFIX = '.org';

const AVAILABLE_MAN_PAGES = [
    'ofs',
    'ls',
    'cat',
    'cd',
    'help',
    'neofetch',
    'clear',
    'theme',
    'play',
    'github',
    'weather',
    'fetch',
    'mkdir',
    'touch',
    'rm',
];

export default {
    name: 'man',
    description: 'Display the manual page for a command.',

    execute: async (args, _context) => {
        if (args.length === 0) {
            return (
                <div className='man-output'>
                    <div className='man-header'>Available Manual Pages</div>
                    <div className='man-grid'>
                        {AVAILABLE_MAN_PAGES.map((page) => (
                            <div key={page} className='man-page-item'>
                                - {page}
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '10px', color: 'var(--gray)' }}>
                        Usage: man [page_name]
                    </div>
                </div>
            );
        }
        const pageName = args[0].toLowerCase();

        // Optional: Check if page exists in list before fetching, or just fetch
        if (!AVAILABLE_MAN_PAGES.includes(pageName)) {
            return `man: No manual entry for ${pageName}`;
        }

        const sourcePath = `${MAN_PATH_PREFIX}${pageName}${MAN_PATH_SUFFIX}`;

        try {
            const content = await fetchContent(sourcePath);
            if (!content) {
                return `man: No manual entry for ${pageName}`;
            }
            return <ContentRenderer content={content} type='org' />;
        } catch (_error) {
            // console.log(_error);
            return `man: No manual entry for ${pageName}`;
        }
    },
};
