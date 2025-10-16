export default {
  name: 'cd',
  description: 'Change directory.',
  execute: (args, allCommands, context) => {
    if (args.length === 0 || args[0] === '~') {
      return { isPathUpdate: true, newPath: '~' };
    }
    
    const targetDir = args[0];
    
    if (targetDir === '..') {
      if (context.path === '~') return '';
      const pathParts = context.path.split('/').slice(0, -1);
      return { isPathUpdate: true, newPath: pathParts.length === 1 ? '~' : pathParts.join('/') };
    }

    if (context.currentDirectory.children[targetDir]?.type === 'directory') {
      const newPath = context.path === '~' ? `~/${targetDir}` : `${context.path}/${targetDir}`;
      return { isPathUpdate: true, newPath: newPath };
    } else {
      return `Error: Directory not found "${targetDir}"`;
    }
  },
};