import { asTextResult } from '../utils/commandResult';
import { mkdirAtPath } from '../utils/vfsMutations';

export default {
    name: 'mkdir',
    description: 'Create a directory.',
    execute: (args, context) => {
        if (args.length === 0) {
            return asTextResult('Usage: mkdir [directory]');
        }

        const result = mkdirAtPath(context.filesystem, args[0], context.currentPath);
        if (result.error) {
            return asTextResult(result.error);
        }

        context.setFilesystem(result.filesystem);
        return asTextResult('');
    },
};
