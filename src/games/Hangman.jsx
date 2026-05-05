import { useCallback, useEffect, useState } from 'react';
import {
    MAX_WRONG,
    guessLetter,
    initialHangmanState,
    pickRandomWord,
    renderMaskedWord,
} from './hangmanLogic';

const HANGMAN_STAGES = [
    `  +---+
      |
      |
      |
     ===`,
    `  +---+
  O   |
      |
      |
     ===`,
    `  +---+
  O   |
  |   |
      |
     ===`,
    `  +---+
  O   |
 /|   |
      |
     ===`,
    `  +---+
  O   |
 /|\\  |
      |
     ===`,
    `  +---+
  O   |
 /|\\  |
 /    |
     ===`,
    `  +---+
  O   |
 /|\\  |
 / \\  |
     ===`,
];

export default function Hangman({ onExit }) {
    const [state, setState] = useState(() =>
        initialHangmanState(pickRandomWord())
    );

    const reset = useCallback(() => {
        setState(initialHangmanState(pickRandomWord()));
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                onExit();
                return;
            }
            if (e.key === 'r' || e.key === 'R') {
                if (state.status !== 'playing') reset();
                return;
            }
            if (/^[a-zA-Z]$/.test(e.key)) {
                setState((prev) => guessLetter(prev, e.key));
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onExit, reset, state.status]);

    const stage = HANGMAN_STAGES[Math.min(state.wrong, MAX_WRONG)];
    const masked = renderMaskedWord(state);
    const usedWrong = state.guessed.filter(
        (letter) => !state.word.includes(letter)
    );

    let message = `Wrong: ${state.wrong}/${MAX_WRONG}`;
    if (state.status === 'won') {
        message = `You won! Word was "${state.word}". Press R to play again.`;
    } else if (state.status === 'lost') {
        message = `You lost. Word was "${state.word}". Press R to retry.`;
    }

    return (
        <div className='game-view'>
            <h2 className='game-view__title'>Hangman</h2>
            <h3 className='game-view__score'>{message}</h3>

            <pre
                style={{
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    color: 'var(--fg)',
                    background: 'var(--bg)',
                    border: '1px solid var(--gray)',
                    padding: '12px 24px',
                }}
            >
                {stage}
            </pre>

            <p
                style={{
                    fontSize: '1.6rem',
                    letterSpacing: '0.4rem',
                    color: 'var(--blue)',
                    marginTop: '12px',
                }}
            >
                {masked}
            </p>

            <p
                style={{
                    color: 'var(--red)',
                    marginTop: '8px',
                    minHeight: '1.2rem',
                }}
            >
                Misses: {usedWrong.join(', ') || '-'}
            </p>

            <p className='game-view__instructions'>
                Type letters to guess | R: new word | ESC: terminal
            </p>
        </div>
    );
}
