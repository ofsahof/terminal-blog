import { afterEach, describe, expect, it, vi } from 'vitest';
import playCommand from '../play';

const setMatchMedia = (mobile) => {
    const matcher = (query) => ({
        matches: mobile && /max-width:\s*768px|hover:\s*none/.test(query),
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        onchange: null,
        dispatchEvent: () => false,
    });
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: matcher,
    });
};

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('play command (responsive gating)', () => {
    it('returns view-change for touch-friendly games on mobile', () => {
        setMatchMedia(true);
        const result = playCommand.execute(['tictactoe']);
        expect(result.type).toBe('view-change');
        expect(result.gameName).toBe('tictactoe');
    });

    it('blocks keyboard-required games on small screens', () => {
        setMatchMedia(true);
        const result = playCommand.execute(['snake']);
        expect(result.type).toBe('text');
        expect(result.content).toContain('requires a physical keyboard');
    });

    it('allows keyboard-required games on desktop', () => {
        setMatchMedia(false);
        const result = playCommand.execute(['snake']);
        expect(result.type).toBe('view-change');
        expect(result.gameName).toBe('snake');
    });
});
