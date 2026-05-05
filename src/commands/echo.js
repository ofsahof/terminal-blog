import { asTextResult } from '../utils/commandResult';

export default {
    name: 'echo',
    description: 'Print arguments or piped input to the terminal.',
    execute: (args, context) => {
        if (args.length > 0) {
            return asTextResult(args.join(' '));
        }
        if (context?.pipedInput) {
            return asTextResult(context.pipedInput);
        }
        return asTextResult('');
    },
};
