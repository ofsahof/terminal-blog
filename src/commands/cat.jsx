import React from 'react';
import { filesystem } from '../utils/filesystem.js';
import { formatOrgMode } from '../utils/formatOrgMode.jsx';
import { resolvePath, findEntry } from '../utils/pathHelper.js';

const isOrgMode = (text) => {
  if (typeof text !== 'string') return false;
  return /^(?:\* |\*\* |\*\*\* |#\+BEGIN_SRC|- )/m.test(text);
};

const formatPlainText = (text) => {
  return (
    <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
      {text}
    </div>
  );
};

export default {
  name: 'cat',
  description: 'Concatenate and print files. Formats Org Mode content.',
  execute: (args, context) => {
    const { currentPath } = context; 

    if (args.length === 0) {
      return 'Usage: cat [file]...';
    }

    const path = args[0];

    const resolvedPath = resolvePath(path, currentPath);
    const entry = findEntry(resolvedPath, filesystem);

    if (!entry) {
      return `cat: ${path}: No such file or directory`;
    }
    if (entry.type === 'directory') {
      return `cat: ${path}: Is a directory`;
    }

    const content = entry.content;

    if (isOrgMode(content)) {
      return formatOrgMode(content);
    } else {
      return formatPlainText(content);
    }
  },
};