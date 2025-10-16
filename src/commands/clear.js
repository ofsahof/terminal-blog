export default {
  name: 'clear',
  description: 'Clear the terminal screen with an animation.',
  execute: (args) => {
    // App.jsx'in anlayacağı yeni bir sinyal objesi döndürüyoruz.
    return { isAnimatedClear: true };
  },
};