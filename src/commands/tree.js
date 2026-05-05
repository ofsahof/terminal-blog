import { asTextResult } from '../utils/commandResult';
import { findEntry, resolvePath } from '../utils/pathHelper';
import { filesystem as defaultFilesystem } from '../utils/filesystem';

const renderTree = (entry, name, prefix, isLast, lines) => {
    const connector = prefix === '' ? '' : isLast ? '`-- ' : '|-- ';
    const label = entry.type === 'directory' ? `${name}/` : name;
    lines.push(`${prefix}${connector}${label}`);

    if (entry.type !== 'directory' || !entry.children) {
        return;
    }

    const childNames = Object.keys(entry.children);
    childNames.forEach((childName, index) => {
        const child = entry.children[childName];
        const isLastChild = index === childNames.length - 1;
        const nextPrefix =
            prefix === '' ? '' : prefix + (isLast ? '    ' : '|   ');
        renderTree(child, childName, nextPrefix, isLastChild, lines);
    });
};

export default {
    name: 'tree',
    description: 'Show directory tree from the current path or given path.',
    execute: (args, context) => {
        const target = args[0] || '.';
        const resolved = resolvePath(target, context?.currentPath || '~');
        const fs = context?.filesystem || defaultFilesystem;
        const entry = findEntry(resolved, fs);

        if (!entry) {
            return asTextResult(`tree: ${target}: No such file or directory`);
        }

        const lines = [];
        const rootName = resolved === '~' ? '~' : resolved;
        renderTree(entry, rootName, '', true, lines);
        return asTextResult(lines.join('\n'));
    },
};
