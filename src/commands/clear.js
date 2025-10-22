export default {
  name: 'clear',
  description: 'Clear the terminal screen with an animation.',
  execute: (args) => {
    return { isAnimatedClear: true };
  },
};