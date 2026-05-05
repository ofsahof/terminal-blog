import { asTextResult } from '../utils/commandResult';
import { rmAtPath } from '../utils/vfsMutations';

export default {
    name: 'rm',
    description: 'Remove an empty file or directory.',
    execute: (args, context) => {
        if (args.length === 0) {
            return asTextResult('Usage: rm [path]');
        }

        const result = rmAtPath(context.filesystem, args[0], context.currentPath);
        if (result.error) {
            return asTextResult(result.error);
        }

        context.setFilesystem(result.filesystem);
        return asTextResult('');
    },
};
