import React from 'react';
import { useTerminal } from './hooks/useTerminal';
import './App.css';

const renderHistoryLine = (line, index) => {
  if (typeof line === 'string') {
    return <div key={index} dangerouslySetInnerHTML={{ __html: line }} />;
  }
  if (React.isValidElement(line)) {
    return <div key={index}>{line}</div>;
  }
  return null;
};

export default function App() {
  const {
    history,
    path,
    command,
    setCommand,
    handleKeyDown,
    inputRef,
    terminalRef
  } = useTerminal();

  return (
    <div  
      className="terminal"  
      ref={terminalRef}  
      onClick={() => inputRef.current?.focus()}
    >
      {history.map(renderHistoryLine)}
      
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