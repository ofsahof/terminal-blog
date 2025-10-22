export const findEntry = (path, filesystem) => {
  if (path === '~') {
    return filesystem['~'];
  }

  const parts = path.split('/').slice(1);
  let current = filesystem['~'];

  for (const part of parts) {
    if (!part) continue; 

    if (current && current.type === 'directory' && current.children && current.children[part]) {
      current = current.children[part];
    } else {
      return null;
    }
  }
  return current; 
};

export const resolvePath = (path, currentPath) => {
  if (path.startsWith('~/')) {
    return path;
  }

  let parts;
  if (currentPath === '~') {
    parts = [];
  } else {
    parts = currentPath.split('/').slice(1); 
  }

  const segments = path.split('/');

  for (const segment of segments) {
    if (segment === '..') {
      parts.pop(); 
    } else if (segment === '.' || segment === '') {
      continue;
    } else {
      parts.push(segment); 
    }
  }

  if (parts.length === 0) {
    return '~';
  }
  return `~/${parts.join('/')}`;
};

export const getDirectoryByPath = (filesystem, path) => {
  const entry = findEntry(path, filesystem);

  if (entry && entry.type === 'directory') {
    return entry;
  }
  return null;
};