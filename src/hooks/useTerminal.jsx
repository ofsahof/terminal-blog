import { useState, useEffect, useRef } from 'react';
import { commands } from '../commands';
import { applyTheme, initializeTheme } from '../utils/themeManager';
import { loadFilesystem, saveFilesystem } from '../utils/vfsState';
import { resultTypes } from '../utils/commandResult';

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
    const [filesystem, setFilesystem] = useState(() => loadFilesystem());

    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    // Use a ref to track if we have initialized history to prevent infinite loops
    // caused by initialHistory being a new array on every render if passed as prop default
    const hasInitialized = useRef(false);

    useEffect(() => {
        initializeTheme();
    }, []);

    useEffect(() => {
        saveFilesystem(filesystem);
    }, [filesystem]);

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

    const normalizeResult = (result) => {
        if (result?.isImmediateClear) {
            return { type: resultTypes.CLEAR };
        }
        if (result?.isPathUpdate) {
            return { type: resultTypes.PATH_UPDATE, newPath: result.newPath };
        }
        if (result?.isViewChange) {
            return {
                type: resultTypes.VIEW_CHANGE,
                newView: result.newView,
                gameName: result.gameName,
                props: result.props || {},
            };
        }
        if (!result) {
            return null;
        }
        if (result.type) {
            return result;
        }
        if (typeof result === 'string') {
            return { type: resultTypes.TEXT, content: result };
        }
        return { type: resultTypes.COMPONENT, content: result };
    };

    const parseCommand = (raw) => {
        return raw
            .split('|')
            .map((segment) => segment.trim())
            .filter(Boolean)
            .map((segment) => {
                const parts = segment.split(/\s+/);
                return { name: (parts[0] || '').toLowerCase(), args: parts.slice(1) };
            });
    };

    const executePipeline = async (cmdStr) => {
        const segments = parseCommand(cmdStr);
        let pipedInput = '';
        let lastResult = null;

        for (const segment of segments) {
            const commandToExecute = commands[segment.name];
            if (!commandToExecute) {
                return {
                    type: resultTypes.ERROR,
                    content: `command not found: ${segment.name}`,
                };
            }

            const context = {
                currentPath: path,
                allCommands: commands,
                filesystem,
                setFilesystem,
                pipedInput,
                commandHistory,
            };

            const rawResult = await commandToExecute.execute(segment.args, context);
            const result = normalizeResult(rawResult);
            lastResult = result;

            if (
                result?.type === resultTypes.TEXT ||
                result?.type === resultTypes.ERROR
            ) {
                pipedInput = result.content || '';
            } else {
                pipedInput = '';
            }

            if (
                result?.type === resultTypes.CLEAR ||
                result?.type === resultTypes.PATH_UPDATE ||
                result?.type === resultTypes.VIEW_CHANGE ||
                result?.type === resultTypes.THEME_CHANGE
            ) {
                break;
            }
        }

        return lastResult;
    };

    const handleCommand = async (cmdStr) => {
        const promptNode = (
            <span className='prompt'>
                {path} &gt; {cmdStr}
            </span>
        );
        const trimmedCommand = cmdStr.trim();
        if (!trimmedCommand) {
            return;
        }

        if (!commandHistory.includes(trimmedCommand)) {
            setCommandHistory((prev) => [trimmedCommand, ...prev]);
        }
        setHistoryIndex(-1);

        const result = await executePipeline(trimmedCommand);

        if (result?.type === resultTypes.CLEAR) {
            setHistory(initialHistory || []);
            return;
        }

        if (result?.type === resultTypes.PATH_UPDATE) {
            setHistory((prev) => [...prev, promptNode]);
            setPath(result.newPath);
            return;
        }

        if (result?.type === resultTypes.VIEW_CHANGE) {
            setHistory((prev) => [...prev, promptNode]);
            if (onViewChange) {
                onViewChange(result.newView, result.gameName, result.props);
            }
            return;
        }

        if (result?.type === resultTypes.THEME_CHANGE) {
            applyTheme(result.themeName);
            setHistory((prev) => [
                ...prev,
                promptNode,
                `Theme changed to ${result.themeName}.`,
            ]);
            return;
        }

        setHistory((prev) => {
            const next = [...prev, promptNode];
            if (result?.type === resultTypes.TEXT || result?.type === resultTypes.ERROR) {
                next.push(result.content);
            } else if (result?.type === resultTypes.COMPONENT) {
                next.push(result.content);
            }
            return next;
        });
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
