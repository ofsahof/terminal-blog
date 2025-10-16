export default {
  name: 'clear',
  description: 'Clear the terminal screen.',
  
  execute: (args) => {
    return { isClear: true };
  },
};