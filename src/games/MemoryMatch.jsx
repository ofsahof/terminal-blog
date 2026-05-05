import { useCallback, useEffect, useMemo, useState } from 'react';

const SYMBOLS = ['*', '#', '@', '%', '+', '$'];

const shuffle = (array) => {
    const next = [...array];
    for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
};

const buildDeck = () =>
    shuffle(
        [...SYMBOLS, ...SYMBOLS].map((symbol, index) => ({
            id: index,
            symbol,
            matched: false,
        }))
    );

export default function MemoryMatch({ onExit }) {
    const [deck, setDeck] = useState(buildDeck);
    const [revealed, setRevealed] = useState([]);
    const [moves, setMoves] = useState(0);
    const [bestMoves, setBestMoves] = useState(() =>
        Number(localStorage.getItem('terminal-memory-best') || 0)
    );

    const reset = useCallback(() => {
        setDeck(buildDeck());
        setRevealed([]);
        setMoves(0);
    }, []);

    const allMatched = useMemo(() => deck.every((c) => c.matched), [deck]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onExit();
            else if (e.key === 'r' || e.key === 'R') reset();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onExit, reset]);

    useEffect(() => {
        if (revealed.length !== 2) return undefined;
        const [first, second] = revealed;
        if (first.symbol === second.symbol) {
            setDeck((prev) =>
                prev.map((card) =>
                    card.symbol === first.symbol
                        ? { ...card, matched: true }
                        : card
                )
            );
            setRevealed([]);
            setMoves((value) => value + 1);
            return undefined;
        }
        const timer = setTimeout(() => {
            setRevealed([]);
            setMoves((value) => value + 1);
        }, 600);
        return () => clearTimeout(timer);
    }, [revealed]);

    useEffect(() => {
        if (!allMatched) return;
        if (bestMoves === 0 || moves < bestMoves) {
            setBestMoves(moves);
            localStorage.setItem('terminal-memory-best', String(moves));
        }
    }, [allMatched]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCard = (card) => {
        if (card.matched) return;
        if (revealed.length === 2) return;
        if (revealed.find((r) => r.id === card.id)) return;
        setRevealed((prev) => [...prev, card]);
    };

    const isVisible = (card) =>
        card.matched || revealed.some((r) => r.id === card.id);

    return (
        <div className='game-view'>
            <h2 className='game-view__title'>Memory Match</h2>
            <h3 className='game-view__score'>
                Moves: {moves} | Best: {bestMoves || '-'}
            </h3>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 70px)',
                    gridTemplateRows: 'repeat(3, 70px)',
                    gap: '8px',
                    border: '2px solid var(--gray)',
                    padding: '10px',
                }}
            >
                {deck.map((card) => (
                    <button
                        key={card.id}
                        onClick={() => handleCard(card)}
                        style={{
                            fontFamily: 'inherit',
                            fontSize: '1.6rem',
                            cursor: card.matched ? 'default' : 'pointer',
                            background: isVisible(card)
                                ? 'var(--bg)'
                                : 'var(--gray)',
                            color: card.matched
                                ? 'var(--green)'
                                : 'var(--fg)',
                            border: '1px solid var(--gray)',
                        }}
                    >
                        {isVisible(card) ? card.symbol : '?'}
                    </button>
                ))}
            </div>

            <p className='game-view__instructions'>
                {allMatched ? 'You cleared the deck! ' : ''}
                Click cards to flip | R: reset | ESC: terminal
            </p>
        </div>
    );
}
