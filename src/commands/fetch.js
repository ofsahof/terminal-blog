import { asTextResult } from '../utils/commandResult';

const tryParseJson = (input) => {
    try {
        return JSON.parse(input);
    } catch (_error) {
        return null;
    }
};

export default {
    name: 'fetch',
    description: 'Fetch JSON from URL. Usage: fetch [url]',
    execute: async (args, context) => {
        const input = args[0] || context.pipedInput || '';
        if (!input) {
            return asTextResult('Usage: fetch [url]');
        }

        const response = await fetch(input);
        if (!response.ok) {
            return asTextResult(`fetch: request failed (${response.status})`);
        }

        const text = await response.text();
        const json = tryParseJson(text);
        return asTextResult(json ? JSON.stringify(json, null, 2) : text);
    },
};
