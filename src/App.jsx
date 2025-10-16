import React, { useState, useEffect, useRef } from 'react';
import { commands } from './commands';
import { filesystem } from './utils/filesystem';
import { getDirectoryByPath } from './utils/pathHelper';
import { welcomeArt } from './content/ascii/welcome';
import './App.css';

const welcomeMessage = [
  welcomeArt, // ASCII art'ımızı içeren değişkeni dizinin ilk elemanı yapıyoruz.
  'Welcome! [Version 1.0.0]',
  'Type "help" for a list of available commands.',
  '--------------------------------------------------',
  '',
];

export default function App() {
  const [history, setHistory] = useState(welcomeMessage);
  const [command, setCommand] = useState('');
  const [path, setPath] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]); 
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
    let newHistory = [...history, `${prompt} ${cmdStr}`];

    const parts = cmdStr.trim().split(' ');
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);
    const currentDirectory = getDirectoryByPath(filesystem, path);

    const context = { path, currentDirectory, filesystem };

    if (cmdName in commands) {
      const commandToExecute = commands[cmdName];
      const result = commandToExecute.execute(args, commands, context);

      if (result?.isAnimatedClear) {
        const terminal = terminalRef.current;
        if (terminal) {
          terminal.classList.add('clearing');
          setTimeout(() => {
            setHistory([]);
            terminal.classList.remove('clearing');
          }, 400);
        }
   
      } else if (result?.isPathUpdate) {
        setPath(result.newPath);
      } else if (result) {
        newHistory.push(result);
      }
    } else if (cmdName) {
      newHistory.push(`command not found: <span class="error">${cmdName}</span>`);
    }
  if (cmdName && !commandHistory.includes(cmdStr)) {
    setCommandHistory([cmdStr, ...commandHistory]);
  } 
  setHistoryIndex(-1)
  setHistory(newHistory);
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
    } 
    else if (e.key === 'Tab') {
      e.preventDefault();

      const parts = command.trim().split(' ');
      const currentWord = parts[parts.length - 1];

      let suggestions = [];

      if (parts.length === 1) {
        suggestions = Object.keys(commands).filter(cmd => cmd.startsWith(currentWord));
      } else {
        const currentDir = getDirectoryByPath(filesystem, path);
        suggestions = Object.keys(currentDir.children).filter(file => file.startsWith(currentWord));
      }

      if (suggestions.length === 1) {
        const newCommand = [...parts.slice(0, -1), suggestions[0]].join(' ');
        setCommand(newCommand + ' ');
      } else if (suggestions.length > 1) {
         const prompt = `<span class="prompt">${path} &gt;</span>`;
         const newHistory = [...history, `${prompt} ${command}`, suggestions.join('  ')];
         setHistory(newHistory);
      }
    }
      else if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(command);
      setCommand('');
    }
  };

  return (
    <div 
      className="terminal" 
      ref={terminalRef} 
      onClick={() => inputRef.current?.focus()}
      >
      {history.map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
      
      <div className="input-line" onClick={() => inputRef.current?.focus()}>
        <span className="prompt">{path} &gt;</span>
        <div className="fake-input">
          <span>{command}</span>
          <div className="cursor"></div>
        </div>
        <input
          ref={inputRef}
          className="hidden-input"
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
}