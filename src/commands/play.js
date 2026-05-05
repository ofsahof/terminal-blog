import { games, listGames, listTouchFriendlyGames } from '../games';
import { asTextResult, asViewChangeResult } from '../utils/commandResult';
import { isKeyboardLimited } from '../utils/device';

const buildAvailableLine = () => {
    const all = listGames();
    if (!isKeyboardLimited()) {
        return `Available: ${all.join(', ')}`;
    }
    const touch = listTouchFriendlyGames();
    return [
        `Available on this device: ${touch.join(', ') || '-'}`,
        `Desktop-only (keyboard required): ${all
            .filter((name) => !touch.includes(name))
            .join(', ')}`,
    ].join('\n');
};

export default {
    name: 'play',
    description: 'Launch a game from the registry.',

    execute: (args) => {
        const all = listGames();

        if (args.length === 0) {
            return asTextResult(
                `Usage: play [game_name]\n${buildAvailableLine()}`
            );
        }

        const gameName = args[0].toLowerCase();

        if (!all.includes(gameName)) {
            return asTextResult(
                `Error: Game "${gameName}" not found.\n${buildAvailableLine()}`
            );
        }

        if (games[gameName].requiresKeyboard && isKeyboardLimited()) {
            return asTextResult(
                `"${gameName}" requires a physical keyboard. Try it on a desktop browser.\n${buildAvailableLine()}`
            );
        }

        return asViewChangeResult('game', gameName);
    },
};
