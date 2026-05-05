import { asTextResult } from '../utils/commandResult';
import { touchAtPath } from '../utils/vfsMutations';

export default {
    name: 'touch',
    description: 'Create an empty file.',
    execute: (args, context) => {
        if (args.length === 0) {
            return asTextResult('Usage: touch [file]');
        }

        const result = touchAtPath(context.filesystem, args[0], context.currentPath);
        if (result.error) {
            return asTextResult(result.error);
        }

        context.setFilesystem(result.filesystem);
        return asTextResult('');
    },
};
