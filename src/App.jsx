import React, { useState, useEffect } from 'react';
import { fetchContent } from './utils/contentFetcher.js';
import { useTerminal } from './hooks/useTerminal.jsx';
import { gameRegistry } from './games';
import './App.css';

const renderHistoryLine = (line, index) => {
    if (typeof line === 'string') {
        return <div key={index} dangerouslySetInnerHTML={{ __html: line }} />;
    }
    if (React.isValidElement(line)) {
        return <div key={index}>{line}</div>;
    }
    return null;
};

export default function App() {
    const [initialHistory, setInitialHistory] = useState(null);
    const [view, setView] = useState('terminal');
    const [gameToLoad, setGameToLoad] = useState(null);

    useEffect(() => {
        const loadWelcome = async () => {
            const content = await fetchContent('/content/welcome.txt');
            setInitialHistory([content]);
        };
        loadWelcome();
    }, []);

    const handleViewChange = (newView, gameName) => {
        setView(newView);
        setGameToLoad(gameName);
    };

    const handleGameExit = () => {
        setView('terminal');
        setGameToLoad(null);
    };

    const {
        history,
        path,
        command,
        setCommand,
        handleKeyDown,
        inputRef,
        terminalRef,
    } = useTerminal({
        onViewChange: handleViewChange,
        initialHistory: initialHistory,
    });

    if (!initialHistory) {
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'var(--bg)',
                    color: 'var(--fg)',
                    fontFamily: 'monospace',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                Booting TerminalFolio...
            </div>
        );
    }

    if (view === 'terminal') {
        return (
            <div
                className='terminal'
                ref={terminalRef}
                onClick={() => inputRef.current?.focus()}
            >
                {history.map(renderHistoryLine)}

                <div
                    className='input-line'
                    onClick={() => inputRef.current?.focus()}
                >
                    <span className='prompt'>{path} &gt;</span>
                    <div className='fake-input'>
                        <span>{command}</span>
                        <div className='cursor'></div>
                    </div>
                    <input
                        ref={inputRef}
                        className='hidden-input'
                        type='text'
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                </div>
            </div>
        );
    } else if (view === 'game') {
        const GameComponent = gameRegistry[gameToLoad];

        return GameComponent ? (
            <GameComponent onExit={handleGameExit} />
        ) : (
            <div>
                <p>Error: Game component ({gameToLoad}) not found.</p>
                <button onClick={handleGameExit}>Back to Terminal</button>
            </div>
        );
    }

    return <div>Loading...</div>; // Fallback
}
