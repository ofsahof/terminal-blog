import { useCallback, useEffect, useState } from 'react';

const PLAYER = 'X';
const COMPUTER = 'O';
const EMPTY_BOARD = Array(9).fill(null);

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const detectWinner = (board) => {
    for (const [a, b, c] of winningLines) {
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return { winner: board[a], line: [a, b, c] };
        }
    }
    return board.every(Boolean) ? { winner: 'draw', line: [] } : null;
};

const findBestMove = (board, mark) => {
    const opponent = mark === COMPUTER ? PLAYER : COMPUTER;

    for (let i = 0; i < 9; i += 1) {
        if (!board[i]) {
            const next = [...board];
            next[i] = mark;
            if (detectWinner(next)?.winner === mark) return i;
        }
    }
    for (let i = 0; i < 9; i += 1) {
        if (!board[i]) {
            const next = [...board];
            next[i] = opponent;
            if (detectWinner(next)?.winner === opponent) return i;
        }
    }
    if (!board[4]) return 4;
    const corners = [0, 2, 6, 8].filter((idx) => !board[idx]);
    if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
    }
    const sides = [1, 3, 5, 7].filter((idx) => !board[idx]);
    if (sides.length > 0) {
        return sides[Math.floor(Math.random() * sides.length)];
    }
    return -1;
};

export default function TicTacToe({ onExit }) {
    const [board, setBoard] = useState(EMPTY_BOARD);
    const [turn, setTurn] = useState(PLAYER);
    const [score, setScore] = useState({ player: 0, computer: 0, draw: 0 });

    const result = detectWinner(board);

    const reset = useCallback(() => {
        setBoard(EMPTY_BOARD);
        setTurn(PLAYER);
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                onExit();
            } else if (e.key === 'r' || e.key === 'R') {
                reset();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onExit, reset]);

    useEffect(() => {
        if (result) {
            setScore((prev) => {
                if (result.winner === PLAYER) {
                    return { ...prev, player: prev.player + 1 };
                }
                if (result.winner === COMPUTER) {
                    return { ...prev, computer: prev.computer + 1 };
                }
                return { ...prev, draw: prev.draw + 1 };
            });
        }
    }, [result?.winner]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (turn !== COMPUTER || result) return undefined;
        const move = findBestMove(board, COMPUTER);
        if (move < 0) return undefined;
        const timer = setTimeout(() => {
            setBoard((prev) => {
                if (prev[move]) return prev;
                const next = [...prev];
                next[move] = COMPUTER;
                return next;
            });
            setTurn(PLAYER);
        }, 350);
        return () => clearTimeout(timer);
    }, [turn, board, result]);

    const handleCell = (index) => {
        if (result || board[index] || turn !== PLAYER) return;
        const next = [...board];
        next[index] = PLAYER;
        setBoard(next);
        setTurn(COMPUTER);
    };

    const status = result
        ? result.winner === 'draw'
            ? 'Draw! Press R to play again.'
            : `${result.winner === PLAYER ? 'You win!' : 'Computer wins!'} Press R to play again.`
        : turn === PLAYER
          ? 'Your turn (X)'
          : 'Computer thinking...';

    return (
        <div className='game-view'>
            <h2 className='game-view__title'>Tic-Tac-Toe</h2>
            <h3 className='game-view__score'>
                You: {score.player} | CPU: {score.computer} | Draws: {score.draw}
            </h3>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 80px)',
                    gridTemplateRows: 'repeat(3, 80px)',
                    gap: '6px',
                    border: '2px solid var(--gray)',
                    padding: '6px',
                    background: 'var(--bg)',
                }}
            >
                {board.map((cell, index) => {
                    const isWinning = result?.line?.includes(index);
                    return (
                        <button
                            key={index}
                            onClick={() => handleCell(index)}
                            style={{
                                fontFamily: 'inherit',
                                fontSize: '2.4rem',
                                background: 'var(--bg)',
                                color: isWinning
                                    ? 'var(--green)'
                                    : cell === PLAYER
                                      ? 'var(--blue)'
                                      : 'var(--red)',
                                border: '1px solid var(--gray)',
                                cursor: cell ? 'default' : 'pointer',
                            }}
                        >
                            {cell || ''}
                        </button>
                    );
                })}
            </div>

            <p className='game-view__instructions'>
                {status} | R: reset | ESC: terminal
            </p>
        </div>
    );
}
