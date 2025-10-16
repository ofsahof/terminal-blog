export default {
  name: 'cat',
  description: 'Display content of a file.',
  execute: (args, allCommands, context) => {
    if (args.length === 0) {
      return 'Usage: cat [file]';
    }
    const fileName = args[0];
    const currentDir = context.currentDirectory;

    if (currentDir.children[fileName]) {
      const item = currentDir.children[fileName];
      if (item.type === 'file') {
        return `<pre>${item.content}</pre>`;
      } else {
        return `Error: "${fileName}" is a directory.`;
      }
    } else {
      return `Error: File not found "${fileName}".`;
    }
  },
};