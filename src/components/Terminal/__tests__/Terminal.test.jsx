import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Terminal from '../Terminal';

// Mock scrollTo to avoid jsdom errors
Element.prototype.scrollTo = vi.fn();

describe('Terminal Component', () => {
    it('renders the initial prompt', async () => {
        render(<Terminal />);
        // Wait for help command to execute and prompt to appear
        await waitFor(() => {
            expect(screen.getAllByText(/~ >/)[0]).toBeInTheDocument();
        });
    });

    it('renders help command output (JSX result)', async () => {
        render(<Terminal />);
        await waitFor(() => {
            expect(screen.getByText('Available Commands:')).toBeInTheDocument();
        });
    });

    it('accepts input and updates display', async () => {
        render(<Terminal />);
        const input = await screen.findByRole('textbox');

        fireEvent.change(input, { target: { value: 'test command' } });

        // We need to check if the fake input text updates.
        // The fake input contains the command text.
        // Since we are looking for the text 'test command'
        expect(screen.getByText('test command')).toBeInTheDocument();
    });

    it('executes clear command', async () => {
        render(<Terminal />);
        const input = await screen.findByRole('textbox');

        // Type clear
        fireEvent.change(input, { target: { value: 'clear' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // History should be cleared.
        // The help message which runs initially should be gone.
        // Assuming help message has some content like "Available commands"
        // Wait for it to disappear
        await waitFor(() => {
            // This is a bit loose, simply checking if history contains fewer items
            // But let's check if the previous 'clear' command is NOT in history (since clear wipes everything including itself usually? or just output?)
            // In original code: clear -> setHistory([])
            // So it should be empty.
            // But 'help' runs on mount.
            // So sequence: mount -> help -> type clear -> enter -> history cleared.
            const historyContainer = input
                .closest('.terminal-container')
                .querySelector('.history-container');
            expect(historyContainer.children.length).toBe(0);
        });
    });
});
