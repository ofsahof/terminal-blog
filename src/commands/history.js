import { asTextResult } from '../utils/commandResult';

export default {
    name: 'history',
    description: 'Show previously entered commands.',
    execute: (_args, context) => {
        const entries = context?.commandHistory || [];
        if (entries.length === 0) {
            return asTextResult('No commands in history yet.');
        }

        const lines = entries
            .slice()
            .reverse()
            .map((cmd, index) => `${String(index + 1).padStart(3, ' ')}  ${cmd}`);
        return asTextResult(lines.join('\n'));
    },
};
