import { filesystem } from '../utils/filesystem.js';
import { resolvePath, findEntry } from '../utils/pathHelper.js';

export default {
    name: 'cd',
    description: 'Change directory.',
    execute: (args, context) => {
        const { currentPath } = context;

        const targetPath = args.length === 0 ? '~' : args[0];

        const newResolvedPath = resolvePath(targetPath, currentPath);
        const entry = findEntry(newResolvedPath, filesystem);

        if (!entry) {
            return `cd: ${targetPath}: No such file or directory`;
        }

        if (entry.type !== 'directory') {
            return `cd: ${targetPath}: Not a directory`;
        }

        return { isPathUpdate: true, newPath: newResolvedPath };
    },
};
