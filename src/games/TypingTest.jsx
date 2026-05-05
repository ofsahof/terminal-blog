import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const SAMPLE_TEXTS = [
    'The terminal is the most powerful interface a developer can master.',
    'Pluggable commands keep the core small and the extensions limitless.',
    'React with Vite makes iterating on terminal experiences delightful.',
    'Practice typing every day to build muscle memory for fluent coding.',
    'A small core, lots of plugins, that is the philosophy of this site.',
];

const DURATION_SECONDS = 30;

const computeStats = (target, typed, secondsElapsed) => {
    if (typed.length === 0 || secondsElapsed <= 0) {
        return { wpm: 0, accuracy: 0 };
    }
    const correct = typed
        .split('')
        .filter((char, idx) => char === target[idx]).length;
    const accuracy = Math.round((correct / typed.length) * 100);
    const minutes = secondsElapsed / 60;
    const wpm = Math.round(typed.length / 5 / minutes);
    return { wpm, accuracy };
};

const pickText = () =>
    SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];

export default function TypingTest({ onExit }) {
    const [text, setText] = useState(() => pickText());
    const [typed, setTyped] = useState('');
    const [startedAt, setStartedAt] = useState(null);
    const [now, setNow] = useState(Date.now());
    const inputRef = useRef(null);

    const reset = useCallback(() => {
        setText(pickText());
        setTyped('');
        setStartedAt(null);
        setNow(Date.now());
        if (inputRef.current) inputRef.current.focus();
    }, []);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                onExit();
            } else if (
                (e.key === 'r' || e.key === 'R') &&
                (e.ctrlKey || e.metaKey)
            ) {
                e.preventDefault();
                reset();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onExit, reset]);

    useEffect(() => {
        if (!startedAt) return undefined;
        const interval = setInterval(() => setNow(Date.now()), 250);
        return () => clearInterval(interval);
    }, [startedAt]);

    const elapsed = startedAt ? (now - startedAt) / 1000 : 0;
    const remaining = Math.max(DURATION_SECONDS - elapsed, 0);
    const finished = remaining === 0 || typed === text;

    const stats = useMemo(
        () => computeStats(text, typed, elapsed),
        [text, typed, elapsed]
    );

    const handleChange = (e) => {
        if (finished) return;
        const value = e.target.value;
        if (!startedAt && value.length > 0) setStartedAt(Date.now());
        setTyped(value.slice(0, text.length));
    };

    return (
        <div className='game-view'>
            <h2 className='game-view__title'>Typing Test</h2>
            <h3 className='game-view__score'>
                {finished ? 'Done' : `Time left: ${Math.ceil(remaining)}s`} |
                WPM: {stats.wpm} | Accuracy: {stats.accuracy}%
            </h3>

            <div
                style={{
                    maxWidth: '720px',
                    padding: '16px',
                    border: '1px solid var(--gray)',
                    background: 'var(--bg)',
                    fontSize: '1.1rem',
                    lineHeight: 1.5,
                }}
            >
                {text.split('').map((char, idx) => {
                    let color = 'var(--fg)';
                    if (idx < typed.length) {
                        color =
                            typed[idx] === char
                                ? 'var(--green)'
                                : 'var(--red)';
                    }
                    return (
                        <span key={idx} style={{ color }}>
                            {char}
                        </span>
                    );
                })}
            </div>

            <input
                ref={inputRef}
                type='text'
                value={typed}
                onChange={handleChange}
                disabled={finished}
                style={{
                    marginTop: '14px',
                    width: 'min(720px, 90vw)',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    padding: '10px',
                    background: 'var(--bg)',
                    color: 'var(--fg)',
                    border: '1px solid var(--gray)',
                    outline: 'none',
                }}
                placeholder='Start typing here...'
                autoComplete='off'
                autoCapitalize='off'
                spellCheck='false'
            />

            <p className='game-view__instructions'>
                Ctrl/Cmd+R: new sample | ESC: terminal
            </p>
        </div>
    );
}
