import { filesystem } from '../utils/filesystem.js';
import { resolvePath, findEntry } from '../utils/pathHelper.js';
import { asPathUpdateResult, asTextResult } from '../utils/commandResult';

export default {
    name: 'cd',
    description: 'Change directory.',
    execute: (args, context) => {
        const { currentPath } = context;

        const targetPath = args.length === 0 ? '~' : args[0];

        const newResolvedPath = resolvePath(targetPath, currentPath);
        const entry = findEntry(newResolvedPath, context.filesystem || filesystem);

        if (!entry) {
            return asTextResult(`cd: ${targetPath}: No such file or directory`);
        }

        if (entry.type !== 'directory') {
            return asTextResult(`cd: ${targetPath}: Not a directory`);
        }

        return asPathUpdateResult(newResolvedPath);
    },
};
