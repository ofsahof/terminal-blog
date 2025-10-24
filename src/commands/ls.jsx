import { filesystem } from '../utils/filesystem.js';
import { resolvePath, findEntry } from '../utils/pathHelper.js';

const formatEntry = (name, type) => {
    const className =
        type === 'directory'
            ? 'ls-item ls-item--directory'
            : 'ls-item ls-item--file';
    return (
        <li key={name} className={className}>
            {name}
            {type === 'directory' ? '/' : ''}
        </li>
    );
};

export default {
    name: 'ls',
    description: 'List files and directories.',
    execute: (args, context) => {
        const { currentPath } = context;

        const targetPath = args.length === 0 ? '.' : args[0];
        const resolvedPath = resolvePath(targetPath, currentPath);
        const entry = findEntry(resolvedPath, filesystem);

        if (!entry) {
            return `ls: ${targetPath}: No such file or directory`;
        }

        if (entry.type === 'file') {
            const name = resolvedPath.split('/').pop();
            return <ul className='ls-output'>{formatEntry(name, 'file')}</ul>;
        }

        if (entry.type === 'directory') {
            const children = entry.children || {};
            const entries = Object.keys(children).map((key) => {
                return formatEntry(key, children[key].type);
            });

            if (entries.length === 0) {
                return '';
            }
            return <ul className='ls-output'>{entries}</ul>;
        }

        return '';
    },
};
