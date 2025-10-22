import React, { useState, useEffect, useRef } from 'react';
import { commands } from '../commands';

export const useTerminal = ({onViewChange, initialHistory = []}) => {
  const [history, setHistory] = useState(initialHistory);
  const [command, setCommand] = useState('');
  const [path, setPath] = useState('~');
  const [commandHistory, setCommandHistory] = useState(initialHistory);  
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('terminal-theme') || 'gruvbox';
    document.body.className = `theme-${savedTheme}`;
  }, []);

  const handleCommand = (cmdStr) => {
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
      const result = commandToExecute.execute(args, context);


      if (result?.isImmediateClear) {
        setHistory(initialHistory); 
        return;
      } 
      
      if (result?.isPathUpdate) {
        setHistory([...history, `${prompt} ${cmdStr}`]); 
        setPath(result.newPath);
        return;
      } 
      
      if (result?.isViewChange) {
        setHistory([...history, `${prompt} ${cmdStr}`]);
        if(onViewChange) {
          onViewChange(result.newView, result.gameName);
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
      newHistory.push(`command not found: <span class="error">${cmdName}</span>`);
      setHistory(newHistory);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setCommand(commandHistory[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setCommand(commandHistory[newIndex] || '');
    }else if (e.key === 'Tab') {
      e.preventDefault();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(command);
      setCommand('');
    }
  };

  return {
    history,
    path,
    command,
    setCommand,
    handleKeyDown,
    inputRef,
    terminalRef
  };
};