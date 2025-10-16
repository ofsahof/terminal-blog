export const getDirectoryByPath = (filesystem, path) => {
  if (path === '~') {
    return filesystem['~'];
  }
  const parts = path.split('/').slice(1);
  let current = filesystem['~'];
  for (const part of parts) {
    if (current && current.type === 'directory' && current.children[part]) {
      current = current.children[part];
    } else {
      return null;
    }
  }
  return current;
};