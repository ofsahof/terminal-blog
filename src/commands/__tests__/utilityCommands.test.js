import { describe, expect, it } from 'vitest';
import echoCommand from '../echo';
import grepCommand from '../grep';
import treeCommand from '../tree';
import historyCommand from '../history';
import cowsayCommand from '../cowsay';
import { filesystem } from '../../utils/filesystem';

describe('echo', () => {
    it('joins arguments with spaces', () => {
        const result = echoCommand.execute(['hello', 'world'], {});
        expect(result.content).toBe('hello world');
    });

    it('falls back to piped input', () => {
        const result = echoCommand.execute([], { pipedInput: 'piped value' });
        expect(result.content).toBe('piped value');
    });
});

describe('grep', () => {
    it('returns matching lines from piped input', () => {
        const result = grepCommand.execute(['react'], {
            pipedInput: 'one\nReact rocks\nthree',
        });
        expect(result.content).toBe('React rocks');
    });

    it('returns usage when missing pattern', () => {
        const result = grepCommand.execute([], {});
        expect(result.content).toContain('Usage');
    });
});

describe('tree', () => {
    it('renders directory tree from filesystem', () => {
        const result = treeCommand.execute([], {
            currentPath: '~',
            filesystem,
        });
        expect(result.content).toContain('~');
        expect(result.content).toContain('projects/');
    });

    it('returns error for unknown path', () => {
        const result = treeCommand.execute(['missing'], {
            currentPath: '~',
            filesystem,
        });
        expect(result.content).toContain('No such file or directory');
    });
});

describe('history', () => {
    it('lists previously entered commands oldest first', () => {
        const result = historyCommand.execute([], {
            commandHistory: ['ls', 'help'],
        });
        expect(result.content.split('\n')).toEqual([
            '  1  help',
            '  2  ls',
        ]);
    });

    it('handles empty history gracefully', () => {
        const result = historyCommand.execute([], { commandHistory: [] });
        expect(result.content).toContain('No commands');
    });
});

describe('cowsay', () => {
    it('wraps message in a speech bubble', () => {
        const result = cowsayCommand.execute(['Hi'], {});
        expect(result.content).toContain('< Hi >');
        expect(result.content).toContain('(oo)');
    });
});
