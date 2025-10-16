export default {
  name: 'help',
  description: 'Show this help message.',
  
  execute: (args, commandList) => {
    let output = '<div class="help-grid">';
    
    for (const commandName in commandList) {
      const command = commandList[commandName];
      output += `<span>${command.name}</span><span>${command.description}</span>`;
    }
    
    output += '</div>';
    return output;
  },
};