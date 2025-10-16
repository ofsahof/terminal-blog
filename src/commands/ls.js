export default {
  name: 'ls',
  description: 'List files and directories.',
  execute: (args, allCommands, context) => {
    
    const currentDir = context.currentDirectory;
    if (!currentDir) return 'Error: Current directory not found.';

    let output = '';
    
    for (const key in currentDir.children) {
      const item = currentDir.children[key];
      if (item.type === 'directory') {
        output += `<span class="directory">${key}/</span>  `;
      } else {
        output += `<span class="file">${key}</span>  `;
      }
    }
    return output.trim();
  },
};