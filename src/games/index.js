import SnakeGame from './SnakeGame.jsx';
import TicTacToe from './TicTacToe.jsx';
import Game2048 from './Game2048.jsx';
import Hangman from './Hangman.jsx';
import MemoryMatch from './MemoryMatch.jsx';
import TypingTest from './TypingTest.jsx';

export const gameRegistry = {
    snake: SnakeGame,
    tictactoe: TicTacToe,
    '2048': Game2048,
    hangman: Hangman,
    memory: MemoryMatch,
    typing: TypingTest,
};
