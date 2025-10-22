import React, { useEffect } from 'react';

export default function SnakeGame({ onExit }) {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onExit();
      }
      // TODO: ARROW KEYS
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onExit]);

  const gameAreaStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#111',
    color: '#fff',
    fontFamily: 'monospace',
  };

  const canvasStyle = {
    backgroundColor: '#000',
    border: '1px solid #333',
  };

  return (
    <div style={gameAreaStyle}>
      <h1 style={{ color: 'var(--green)' }}>Snake Game</h1>
      <p>(Yılan Oyunu Buraya Gelecek)</p>
      
      {/* Gelecekte oyunumuz bu canvas üzerinde çizilecek */}
      <canvas 
        id="game-canvas" 
        width="400" 
        height="400" 
        style={canvasStyle}
      >
      </canvas>

      <p style={{ marginTop: '20px', color: 'var(--gray)' }}>
        Terminal'e geri dönmek için 'ESC' tuşuna basın.
      </p>
    </div>
  );
}