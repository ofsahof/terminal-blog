import React, { useState, useEffect, useRef } from 'react';
import { commands } from './commands';
import { filesystem } from './utils/filesystem';
import { getDirectoryByPath } from './utils/pathHelper';

import './App.css';

const welcomeMessage = [
  'Welcome to TerminalFolio! [Version 1.0.0]',
  'Type "help" to see a list of available commands.',
  '--------------------------------------------------',
  '',
];

export default function App() {
  const [history, setHistory] = useState(welcomeMessage);
  const [command, setCommand] = useState('');
  const [path, setPath] = useState('~');

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

      if (result?.isClear) {
        newHistory = [];
      } else if (result?.isPathUpdate) {
        setPath(result.newPath);
      } else if (result) {
        newHistory.push(result);
      }
    } else if (cmdName) {
      newHistory.push(`command not found: <span class="error">${cmdName}</span>`);
    }

  setHistory(newHistory);
};

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
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
      
      <div className="input-line">
        <span 
        className="prompt">{path} &gt;</span>
        <input
          ref={inputRef}
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