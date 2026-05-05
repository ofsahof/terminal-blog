import { describe, expect, it } from 'vitest';
import {
    boardsEqual,
    hasMoves,
    move,
    SIZE,
} from '../game2048Logic';

const buildBoard = (rows) => {
    if (rows.length !== SIZE) throw new Error('test board must be 4x4');
    return rows.map((row) => [...row]);
};

describe('game2048Logic.move', () => {
    it('merges adjacent equal tiles when sliding left', () => {
        const board = buildBoard([
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);
        const { board: next, gained } = move(board, 'left');
        expect(next[0]).toEqual([4, 0, 0, 0]);
        expect(gained).toBe(4);
    });

    it('does not merge non-equal neighbors', () => {
        const board = buildBoard([
            [2, 4, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);
        const { board: next } = move(board, 'left');
        expect(next[0]).toEqual([2, 4, 0, 0]);
    });

    it('moves tiles in the desired direction', () => {
        const board = buildBoard([
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);
        const { board: next } = move(board, 'down');
        expect(next[3][3]).toBe(4);
    });
});

describe('game2048Logic.boardsEqual and hasMoves', () => {
    it('boardsEqual reports differences correctly', () => {
        const board = buildBoard([
            [2, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);
        expect(boardsEqual(board, board)).toBe(true);
        const altered = buildBoard([
            [2, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 4],
        ]);
        expect(boardsEqual(board, altered)).toBe(false);
    });

    it('hasMoves returns false when grid is full and no merges remain', () => {
        const board = buildBoard([
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2],
        ]);
        expect(hasMoves(board)).toBe(false);
    });
});
