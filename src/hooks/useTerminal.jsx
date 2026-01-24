import { useState, useEffect, useRef } from 'react';
import { commands } from '../commands';

/**
 * Custom hook to manage the terminal state and logic.
 *
 * @param {Object} props
 * @param {Function} props.onViewChange - Callback to change the global app view (e.g. to 'game').
 * @param {Array} [props.initialHistory] - Initial history to display.
 * @returns {Object} All terminal state and handlers.
 */
export const useTerminal = ({ onViewChange, initialHistory = [] }) => {
    const [history, setHistory] = useState(initialHistory || []);
    const [command, setCommand] = useState('');
    const [path, setPath] = useState('~');
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [cursorPos, setCursorPos] = useState(0);

    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    // Use a ref to track if we have initialized history to prevent infinite loops
    // caused by initialHistory being a new array on every render if passed as prop default
    const hasInitialized = useRef(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('terminal-theme') || 'dracula';
        document.body.className = `theme-${savedTheme}`;
    }, []);

    useEffect(() => {
        if (!hasInitialized.current) {
            if (initialHistory && initialHistory.length > 0) {
                setHistory(initialHistory);
            }
            hasInitialized.current = true;
        }
    }, [initialHistory]);

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const scrollToBottom = () => {
        setTimeout(() => {
            if (terminalRef.current) {
                terminalRef.current.scrollTop =
                    terminalRef.current.scrollHeight;
            }
        }, 0);
    };

    const handleCommand = async (cmdStr) => {
        const prompt = `<span class="prompt">${path} &gt;</span>`;

        const parts = cmdStr.trim().split(' ');
        const cmdName = parts[0].toLowerCase();
        const args = parts.slice(1);

        const context = { currentPath: path, allCommands: commands };

        if (cmdName && !commandHistory.includes(cmdStr)) {
            setCommandHistory([cmdStr, ...commandHistory]);
        }
        setHistoryIndex(-1);

        if (cmdName in commands) {
            const commandToExecute = commands[cmdName];
            const result = await commandToExecute.execute(args, context);

            if (result?.isImmediateClear) {
                setHistory(initialHistory || []);
                return;
            }

            if (result?.isPathUpdate) {
                setHistory([...history, `${prompt} ${cmdStr}`]);
                setPath(result.newPath);
                return;
            }

            if (result?.isViewChange) {
                setHistory([...history, `${prompt} ${cmdStr}`]);
                if (onViewChange) {
                    onViewChange(result.newView, result.gameName, result.props);
                }
                return;
            }

            let newHistory = [...history, `${prompt} ${cmdStr}`];
            if (result) {
                newHistory.push(result);
            }
            setHistory(newHistory);
        } else if (cmdName) {
            let newHistory = [...history, `${prompt} ${cmdStr}`];
            newHistory.push(
                `command not found: <span class="error">${cmdName}</span>`
            );
            setHistory(newHistory);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newIndex = Math.min(
                historyIndex + 1,
                commandHistory.length - 1
            );
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex] || '');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newIndex = Math.max(historyIndex - 1, -1);
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex] || '');
        } else if (e.key === 'Tab') {
            e.preventDefault();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(command);
            setCommand('');
            setCursorPos(0);
        }
    };

    return {
        history,
        path,
        command,
        setCommand,
        handleKeyDown,
        inputRef,
        terminalRef,
        cursorPos,
        setCursorPos,
        executeCommand: (cmdText) => {
            if (cmdText) {
                handleCommand(cmdText);
            }
        },
    };
};
