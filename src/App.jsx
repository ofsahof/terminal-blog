import React, { useState, useEffect, useRef } from 'react';
import { commands } from './commands';
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
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr) => {
    let newHistory = [...history, `<span class="prompt">&gt;</span> ${cmdStr}`];
    
    const parts = cmdStr.trim().split(' ');
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmdName in commands) {
      const commandToExecute = commands[cmdName];
      // Komutun .execute fonksiyonunu çalıştırıyoruz.
      // 'help' gibi ihtiyaç duyan komutlar için tüm komut listesini de gönderiyoruz.
      const result = commandToExecute.execute(args, commands);

      if (result?.isClear) {
        newHistory = [];
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
      e.preventDefault(); // Form gönderimini veya varsayılan davranışı engelle
      handleCommand(command);
      setCommand('');
    }
  };

  return (
    <div 
      className="terminal" 
      ref={terminalRef} 
      onClick={() => document.querySelector('.input-line input')?.focus()}
    >
      {history.map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
      
      <div className="input-line">
        <span className="prompt">&gt;</span>
        <input
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