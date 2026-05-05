import { asTextResult } from '../utils/commandResult';

export default {
    name: 'weather',
    description: 'Show current weather. Usage: weather [city]',
    execute: async (args) => {
        const city = args.join(' ').trim() || 'Istanbul';
        const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
        const response = await fetch(url);

        if (!response.ok) {
            return asTextResult(`weather: could not fetch weather for '${city}'`);
        }

        const data = await response.json();
        const current = data?.current_condition?.[0];
        if (!current) {
            return asTextResult(`weather: no data for '${city}'`);
        }

        return asTextResult(
            `${city}: ${current.temp_C}C, feels like ${current.FeelsLikeC}C, humidity ${current.humidity}%`
        );
    },
};
