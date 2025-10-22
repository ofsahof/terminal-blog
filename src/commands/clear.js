export default {
  name: 'clear',
  description: 'Clears the terminal screen.',
  
  execute: () => {
    return { isImmediateClear: true };
  },
};