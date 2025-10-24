import React, { useState, useEffect } from 'react';
import { useTerminal } from './hooks/useTerminal.jsx';
import { gameRegistry } from './games/index.js';
import { fetchContent } from './utils/contentFetcher.js';
import './App.css';

const renderHistoryLine = (line, index) => {
    if (typeof line === 'string') {
        return (
            <div
                key={index}
                className='history__line'
                dangerouslySetInnerHTML={{ __html: line }}
            />
        );
    }
    if (React.isValidElement(line)) {
        return (
            <div key={index} className='history__line'>
                {line}
            </div>
        );
    }
    return null;
};

export default function App() {
    const [view, setView] = useState('terminal');
    const [gameToLoad, setGameToLoad] = useState(null);
    const [initialHistory, setInitialHistory] = useState(null);

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
        handleKeyDown: handleTerminalKeyDown,
        inputRef,
        terminalRef,
        cursorPos,
        setCursorPos,
    } = useTerminal({
        onViewChange: handleViewChange,
        initialHistory: initialHistory,
    });

    if (!initialHistory) {
        return (
            <div className='terminal-booting'>
                Booting TerminalFolio v1.0...
            </div>
        );
    }

    const handleInputKeyDown = (e) => {
        handleTerminalKeyDown(e);
    };

    const handleInputKeyUp = (e) => {
        if (
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowDown' ||
            e.key === 'Home' ||
            e.key === 'End' ||
            e.key === 'Backspace' ||
            e.key === 'Delete'
        ) {
            requestAnimationFrame(() => {
                if (inputRef.current) {
                    setCursorPos(inputRef.current.selectionStart);
                }
            });
        }
    };

    const handleInputChange = (e) => {
        setCommand(e.target.value);
        setCursorPos(e.target.selectionStart);
    };

    if (view === 'terminal') {
        const cursorOffset = `${cursorPos * 0.6}em`;

        return (
            <div className='terminal-container'>
                <div
                    className='history-container'
                    ref={terminalRef}
                    onClick={() => inputRef.current?.focus()}
                >
                    {history.map(renderHistoryLine)}
                </div>
                <div className='input-container'>
                    <div
                        className='input-line'
                        onClick={() => inputRef.current?.focus()}
                    >
                        <span className='input-line__prompt'>{path} &gt;</span>
                        <div className='input-line__fake-input fake-input'>
                            <span className='fake-input__text'>{command}</span>
                            <div
                                className='fake-input__cursor'
                                style={{ left: cursorOffset }}
                            ></div>
                        </div>
                        <input
                            ref={inputRef}
                            className='input-line__hidden-input'
                            type='text'
                            value={command}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            onKeyUp={handleInputKeyUp}
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        );
    } else if (view === 'game') {
        const GameComponent = gameRegistry[gameToLoad];

        return GameComponent ? (
            <GameComponent onExit={handleGameExit} />
        ) : (
            <div className='terminal-error'>
                <p>Error: Game component ({gameToLoad}) not found.</p>
                <button onClick={handleGameExit}>Back to Terminal</button>
            </div>
        );
    }

    return <div className='terminal-loading'>Loading...</div>;
}
