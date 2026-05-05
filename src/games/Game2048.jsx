import { useCallback, useEffect, useState } from 'react';
import {
    boardsEqual,
    hasMoves,
    initializeBoard,
    move,
    placeRandom,
} from './game2048Logic';

const TILE_COLORS = {
    0: 'var(--bg)',
    2: 'var(--gray)',
    4: 'var(--gray)',
    8: 'var(--orange, var(--yellow))',
    16: 'var(--yellow)',
    32: 'var(--red)',
    64: 'var(--purple)',
    128: 'var(--aqua)',
    256: 'var(--green)',
    512: 'var(--blue)',
    1024: 'var(--green)',
    2048: 'var(--red)',
};

export default function Game2048({ onExit }) {
    const [board, setBoard] = useState(() => initializeBoard());
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(() =>
        Number(localStorage.getItem('terminal-2048-best') || 0)
    );

    const reset = useCallback(() => {
        setBoard(initializeBoard());
        setScore(0);
    }, []);

    const handleDirection = useCallback(
        (direction) => {
            setBoard((prev) => {
                const { board: next, gained } = move(prev, direction);
                if (boardsEqual(prev, next)) return prev;
                setScore((current) => {
                    const total = current + gained;
                    if (total > bestScore) {
                        setBestScore(total);
                        localStorage.setItem(
                            'terminal-2048-best',
                            String(total)
                        );
                    }
                    return total;
                });
                return placeRandom(next);
            });
        },
        [bestScore]
    );

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                onExit();
            } else if (e.key === 'r' || e.key === 'R') {
                reset();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                handleDirection('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                handleDirection('down');
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handleDirection('left');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleDirection('right');
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onExit, reset, handleDirection]);

    const gameOver = !hasMoves(board);

    return (
        <div className='game-view'>
            <h2 className='game-view__title'>2048</h2>
            <h3 className='game-view__score'>
                Score: {score} | Best: {bestScore}
            </h3>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 70px)',
                    gridTemplateRows: 'repeat(4, 70px)',
                    gap: '6px',
                    background: 'var(--bg)',
                    padding: '8px',
                    border: '2px solid var(--gray)',
                }}
            >
                {board.flat().map((value, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: TILE_COLORS[value] || 'var(--purple)',
                            color: value > 4 ? 'var(--bg)' : 'var(--fg)',
                            fontFamily: 'inherit',
                            fontWeight: 'bold',
                            fontSize: value >= 1024 ? '1.1rem' : '1.4rem',
                            border: '1px solid var(--gray)',
                            opacity: value === 0 ? 0.6 : 1,
                        }}
                    >
                        {value === 0 ? '' : value}
                    </div>
                ))}
            </div>

            <p className='game-view__instructions'>
                {gameOver
                    ? 'Game over. R: reset | ESC: terminal'
                    : 'Arrows: move | R: reset | ESC: terminal'}
            </p>
        </div>
    );
}
