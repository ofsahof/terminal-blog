import { gameRegistry } from '../games';
import { asTextResult, asViewChangeResult } from '../utils/commandResult';

const availableGames = Object.keys(gameRegistry);

export default {
    name: 'play',
    description: `Launch a game. Available: ${availableGames.join(', ')}`,

    execute: (args) => {
        if (args.length === 0) {
            return asTextResult(
                `Usage: play [game_name]\nAvailable: ${availableGames.join(', ')}`
            );
        }

        const gameName = args[0].toLowerCase();

        if (!availableGames.includes(gameName)) {
            return asTextResult(
                `Error: Game "${gameName}" not found. Available: ${availableGames.join(', ')}`
            );
        }

        return asViewChangeResult('game', gameName);
    },
};
