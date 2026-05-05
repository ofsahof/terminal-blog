import { describe, expect, it, vi } from 'vitest';
import mkdirCommand from '../mkdir';
import touchCommand from '../touch';
import rmCommand from '../rm';
import { filesystem } from '../../utils/filesystem';

const createContext = () => {
    let currentFs = JSON.parse(JSON.stringify(filesystem));

    return {
        get filesystem() {
            return currentFs;
        },
        setFilesystem: vi.fn((nextFs) => {
            currentFs = nextFs;
        }),
        currentPath: '~',
    };
};

describe('vfs commands', () => {
    it('mkdir creates a directory', () => {
        const context = createContext();
        const result = mkdirCommand.execute(['sandbox'], context);
        expect(result.type).toBe('text');
        expect(context.setFilesystem).toHaveBeenCalledOnce();
    });

    it('touch creates a file', () => {
        const context = createContext();
        const result = touchCommand.execute(['draft.txt'], context);
        expect(result.type).toBe('text');
        expect(context.setFilesystem).toHaveBeenCalledOnce();
    });

    it('rm returns error for missing entry', () => {
        const context = createContext();
        const result = rmCommand.execute(['missing.txt'], context);
        expect(result.content).toContain('No such file or directory');
    });
});
