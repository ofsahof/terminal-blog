import { useState } from 'react';
import Terminal from './components/Terminal/Terminal';
import { gameRegistry } from './games/index.js';
import './App.css';

export default function App() {
    const [view, setView] = useState('terminal');
    const [gameToLoad, setGameToLoad] = useState(null);
    const [activeComponentProps, setActiveComponentProps] = useState({});

    const handleViewChange = (newView, gameName, props = {}) => {
        setView(newView);
        setGameToLoad(gameName);
        setActiveComponentProps(props);
    };

    const handleGameExit = () => {
        setView('terminal');
        setGameToLoad(null);
        setActiveComponentProps({});
    };

    if (view === 'terminal') {
        return <Terminal onViewChange={handleViewChange} />;
    } else if (view === 'game') {
        const GameComponent = gameRegistry[gameToLoad];
        return GameComponent ? (
            <GameComponent onExit={handleGameExit} {...activeComponentProps} />
        ) : (
            <div className='terminal-error'>
                <p>Error: Game component ({gameToLoad}) not found.</p>
                <button onClick={handleGameExit}>Back to Terminal</button>
            </div>
        );
    }
    return <div className='terminal-loading'>Loading...</div>;
}
