import SnakeGame from './SnakeGame.jsx';
import TicTacToe from './TicTacToe.jsx';
import Game2048 from './Game2048.jsx';
import Hangman from './Hangman.jsx';
import MemoryMatch from './MemoryMatch.jsx';
import TypingTest from './TypingTest.jsx';

export const games = {
    snake: {
        component: SnakeGame,
        label: 'snake',
        requiresKeyboard: true,
    },
    tictactoe: {
        component: TicTacToe,
        label: 'tictactoe',
        requiresKeyboard: false,
    },
    '2048': {
        component: Game2048,
        label: '2048',
        requiresKeyboard: true,
    },
    hangman: {
        component: Hangman,
        label: 'hangman',
        requiresKeyboard: true,
    },
    memory: {
        component: MemoryMatch,
        label: 'memory',
        requiresKeyboard: false,
    },
    typing: {
        component: TypingTest,
        label: 'typing',
        requiresKeyboard: true,
    },
};

export const gameRegistry = Object.fromEntries(
    Object.entries(games).map(([key, value]) => [key, value.component])
);

export const listGames = () => Object.keys(games);

export const listTouchFriendlyGames = () =>
    Object.keys(games).filter((key) => !games[key].requiresKeyboard);
