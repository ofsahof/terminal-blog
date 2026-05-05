import SnakeGame from './SnakeGame.jsx';
import TicTacToe from './TicTacToe.jsx';
import Game2048 from './Game2048.jsx';

export const gameRegistry = {
    snake: SnakeGame,
    tictactoe: TicTacToe,
    '2048': Game2048,
};
