import { useRef, useEffect } from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import TerminalHistory from './TerminalHistory';
import TerminalInput from './TerminalInput';
import MobileControls from './MobileControls';
import './Terminal.css';

const Terminal = ({ onViewChange }) => {
    const {
        history,
        path,
        command,
        setCommand,
        handleKeyDown,
        inputRef,
        terminalRef,
        cursorPos,
        setCursorPos,
        executeCommand,
    } = useTerminal({ onViewChange });

    const hasAutoRun = useRef(false);

    useEffect(() => {
        if (!hasAutoRun.current) {
            executeCommand('help');
            hasAutoRun.current = true;
        }
    }, [executeCommand]);

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    const handleMobileKey = (key) => {
        // Simulate key events for mobile buttons
        const event = {
            key: key,
            preventDefault: () => {},
        };
        handleKeyDown(event);
        inputRef.current?.focus();
    };

    return (
        <div className='terminal-container' onClick={handleContainerClick}>
            <TerminalHistory history={history} terminalRef={terminalRef} />
            <TerminalInput
                path={path}
                command={command}
                setCommand={setCommand}
                handleKeyDown={handleKeyDown}
                inputRef={inputRef}
                cursorPos={cursorPos}
                setCursorPos={setCursorPos}
            />
            <MobileControls onKey={handleMobileKey} />
        </div>
    );
};

export default Terminal;
