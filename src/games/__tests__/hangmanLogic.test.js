import { describe, expect, it } from 'vitest';
import {
    MAX_WRONG,
    guessLetter,
    initialHangmanState,
    renderMaskedWord,
} from '../hangmanLogic';

describe('hangmanLogic.guessLetter', () => {
    it('reveals letters when the guess is correct', () => {
        const state = initialHangmanState('react');
        const next = guessLetter(state, 'r');
        expect(next.guessed).toContain('r');
        expect(next.wrong).toBe(0);
        expect(renderMaskedWord(next)).toBe('r _ _ _ _');
    });

    it('counts wrong guesses', () => {
        const state = initialHangmanState('react');
        const next = guessLetter(state, 'z');
        expect(next.wrong).toBe(1);
    });

    it('marks the round as won when all letters are revealed', () => {
        let state = initialHangmanState('hi');
        state = guessLetter(state, 'h');
        state = guessLetter(state, 'i');
        expect(state.status).toBe('won');
    });

    it('marks the round as lost after MAX_WRONG mistakes', () => {
        let state = initialHangmanState('react');
        const wrongLetters = ['z', 'q', 'x', 'b', 'm', 'p'];
        wrongLetters.forEach((letter) => {
            state = guessLetter(state, letter);
        });
        expect(state.wrong).toBe(MAX_WRONG);
        expect(state.status).toBe('lost');
    });

    it('ignores duplicate guesses', () => {
        let state = initialHangmanState('react');
        state = guessLetter(state, 'r');
        state = guessLetter(state, 'r');
        expect(state.guessed.filter((l) => l === 'r')).toHaveLength(1);
    });
});
