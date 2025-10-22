// src/commands/ls.js

import React from 'react';
import { filesystem } from '../utils/filesystem.js';
import { resolvePath, findEntry } from '../utils/pathHelper.js';

const formatEntry = (name, type) => {
  if (type === 'directory') {
    return (
      <span key={name} className="directory" style={{ marginRight: '15px' }}>
        {name}/
      </span>
    );
  }
  return (
    <span key={name} className="file" style={{ marginRight: '15px' }}>
      {name}
    </span>
  );
};

export default {
  name: 'ls',
  description: 'List files and directories.',
  execute: (args, context) => {
    const { currentPath } = context;

    const targetPath = args.length === 0 ? '.' : args[0];
    const resolvedPath = resolvePath(targetPath, currentPath);
    const entry = findEntry(resolvedPath, filesystem);

    if (!entry) {
      return `ls: ${targetPath}: No such file or directory`;
    }

    if (entry.type === 'file') {
      const name = resolvedPath.split('/').pop();
      return formatEntry(name, 'file');
    }

    if (entry.type === 'directory') {
      const children = entry.children || {};
      const entries = Object.keys(children).map(key => {
        return formatEntry(key, children[key].type);
      });
      
      if (entries.length === 0) {
        return '';
      }

      return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{entries}</div>;
    }

    return ''; 
  },
};