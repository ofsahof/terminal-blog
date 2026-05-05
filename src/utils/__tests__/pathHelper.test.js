import { describe, expect, it } from 'vitest';
import { findEntry, resolvePath } from '../pathHelper';
import { filesystem } from '../filesystem';

describe('resolvePath', () => {
    it('resolves relative child paths', () => {
        expect(resolvePath('projects', '~')).toBe('~/projects');
    });

    it('resolves parent directory traversal', () => {
        expect(resolvePath('../about.md', '~/projects')).toBe('~/about.md');
    });
});

describe('findEntry', () => {
    it('finds a directory entry', () => {
        const entry = findEntry('~/projects', filesystem);
        expect(entry?.type).toBe('directory');
    });

    it('returns null for unknown entries', () => {
        expect(findEntry('~/missing', filesystem)).toBeNull();
    });
});
