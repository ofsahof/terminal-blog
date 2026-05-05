import { asTextResult } from '../utils/commandResult';

const buildPattern = (raw) => {
    try {
        return new RegExp(raw, 'i');
    } catch (_error) {
        return null;
    }
};

export default {
    name: 'grep',
    description: 'Filter piped input lines matching a pattern.',
    execute: (args, context) => {
        if (args.length === 0) {
            return asTextResult('Usage: grep [pattern]');
        }

        const pattern = buildPattern(args[0]);
        if (!pattern) {
            return asTextResult(`grep: invalid pattern: ${args[0]}`);
        }

        const source = context?.pipedInput || '';
        if (!source) {
            return asTextResult('');
        }

        const lines = source.split('\n').filter((line) => pattern.test(line));
        return asTextResult(lines.join('\n'));
    },
};
