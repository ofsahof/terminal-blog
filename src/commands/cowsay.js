import { asTextResult } from '../utils/commandResult';

const buildBubble = (message) => {
    const lines = message.split('\n');
    const width = Math.max(...lines.map((line) => line.length), 1);
    const top = ` ${'_'.repeat(width + 2)}`;
    const bottom = ` ${'-'.repeat(width + 2)}`;

    if (lines.length === 1) {
        return [top, `< ${lines[0].padEnd(width, ' ')} >`, bottom];
    }

    const body = lines.map((line, idx) => {
        let left = '|';
        let right = '|';
        if (idx === 0) {
            left = '/';
            right = '\\';
        } else if (idx === lines.length - 1) {
            left = '\\';
            right = '/';
        }
        return `${left} ${line.padEnd(width, ' ')} ${right}`;
    });

    return [top, ...body, bottom];
};

const COW = [
        '        \\   ^__^',
        '         \\  (oo)\\_______',
        '            (__)\\       )\\/\\',
        '                ||----w |',
        '                ||     ||',
];

export default {
    name: 'cowsay',
    description: 'Make an ASCII cow speak. Pipe-friendly.',
    execute: (args, context) => {
        const message =
            args.length > 0
                ? args.join(' ')
                : context?.pipedInput || 'Moo!';
        const bubble = buildBubble(message);
        return asTextResult([...bubble, ...COW].join('\n'));
    },
};
