import { filesystem } from '../utils/filesystem.js';
import { formatOrgMode } from '../utils/formatOrgMode.jsx';
import { resolvePath, findEntry } from '../utils/pathHelper.js';
import { fetchContent } from '../utils/contentFetcher.js';

const isOrgMode = (text) => {
    if (typeof text !== 'string') return false;
    return /^(?:\* |\*\* |\*\*\* |#\+BEGIN_SRC|- )/m.test(text);
};

const formatPlainText = (text) => {
    return <div className='cat-output cat-output--plain'>{text}</div>;
};

export default {
    name: 'cat',
    description: 'Concatenate and print files. (Now async)',

    execute: async (args, context) => {
        const { currentPath } = context;

        if (args.length === 0) {
            return 'Usage: cat [file]...';
        }

        const path = args[0];

        const resolvedPath = resolvePath(path, currentPath);
        const entry = findEntry(resolvedPath, filesystem);

        if (!entry) {
            return (
                <span className='error'>
                    cat: {path}: No such file or directory
                </span>
            );
        }
        if (entry.type === 'directory') {
            return <span className='error'>cat: {path}: Is a directory</span>;
        }

        if (!entry.source) {
            return (
                <span className='error'>
                    cat: {path}: Error - File entry has no source path defined
                    in filesystem.js.
                </span>
            );
        }

        try {
            const content = await fetchContent(entry.source);

            if (typeof content !== 'string') {
                return (
                    <span className='error'>
                        cat: {path}: Error fetching content or content is not
                        text.
                    </span>
                );
            }

            if (isOrgMode(content)) {
                return formatOrgMode(content);
            } else {
                return formatPlainText(content);
            }
        } catch (error) {
            return (
                <span className='error'>
                    cat: {path}: Error - {error.message}
                </span>
            );
        }
    },
};
