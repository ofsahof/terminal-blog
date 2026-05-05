import { filesystem } from '../utils/filesystem.js';
import { resolvePath, findEntry } from '../utils/pathHelper.js';
import { fetchContent } from '../utils/contentFetcher.js';
import ContentRenderer from '../components/ContentRenderer';
import { asComponentResult, asTextResult } from '../utils/commandResult';

export default {
    name: 'cat',
    description: 'Concatenate and print files. (Now async)',

    execute: async (args, context) => {
        const { currentPath } = context;

        if (args.length === 0) {
            if (context.pipedInput) {
                return asTextResult(context.pipedInput);
            }
            return asTextResult('Usage: cat [file]...');
        }

        const path = args[0];

        const resolvedPath = resolvePath(path, currentPath);
        const entry = findEntry(resolvedPath, context.filesystem || filesystem);

        if (!entry) {
            return asComponentResult(
                <span className='error'>
                    cat: {path}: No such file or directory
                </span>
            );
        }
        if (entry.type === 'directory') {
            return asComponentResult(
                <span className='error'>cat: {path}: Is a directory</span>
            );
        }

        if (!entry.source && typeof entry.content !== 'string') {
            return asComponentResult(
                <span className='error'>
                    cat: {path}: Error - File entry has no source path defined
                    in filesystem.js.
                </span>
            );
        }

        try {
            const content =
                typeof entry.content === 'string'
                    ? entry.content
                    : await fetchContent(entry.source);

            if (typeof content !== 'string') {
                return asComponentResult(
                    <span className='error'>
                        cat: {path}: Error fetching content or content is not
                        text.
                    </span>
                );
            }
            return asComponentResult(
                <ContentRenderer
                    content={content}
                    type={path.split('.').pop()}
                />
            );
        } catch (error) {
            return asComponentResult(
                <span className='error'>
                    cat: {path}: Error - {error.message}
                </span>
            );
        }
    },
};
