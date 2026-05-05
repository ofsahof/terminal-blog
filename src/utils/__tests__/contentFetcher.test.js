import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchContent } from '../contentFetcher';

describe('fetchContent', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('returns response text for valid text content', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                headers: { get: () => 'text/plain' },
                text: async () => 'hello',
            })
        );

        await expect(fetchContent('/content/test.txt')).resolves.toBe('hello');
    });

    it('throws for html fallback responses', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                headers: { get: () => 'text/html' },
                text: async () => '<html></html>',
            })
        );

        await expect(fetchContent('/content/missing.txt')).rejects.toThrow(
            'received HTML fallback'
        );
    });
});
