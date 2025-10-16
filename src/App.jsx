import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const welcomeMessage = [
  'Welcome to ofsahof\'s personel website ! [Version 1.0.0]',
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Komut gönderildi:', command);
      setCommand('');
    }
  };

  return (
    <div 
      className="terminal" 
      ref={terminalRef} 
      onClick={() => document.querySelector('.input-line input')?.focus()}
    >
      {/* Geçmiş Komutlar ve Çıktıları */}
      {history.map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
      
      {/* Yeni Komut Giriş Satırı */}
      <div className="input-line">
        <span style={{ color: 'var(--green)' }}>&gt;</span>
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