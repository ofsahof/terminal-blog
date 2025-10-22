import React from 'react';
import { commands } from './index.js'; 

export default {
  name: 'help',
  description: 'Show this help message.',
  
  execute: (args, context) => {

    return (
      <div className="help-grid">
        {Object.values(commands).map(command => (
          <React.Fragment key={command.name}>
            <span style={{ color: 'var(--blue)' }}>{command.name}</span>
            <span>{command.description}</span>
          </React.Fragment>
        ))}
      </div>
    );
  },
};