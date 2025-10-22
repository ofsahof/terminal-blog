import { welcomeArt } from '../content/ascii/welcome';

export const welcomeMessage = [
  welcomeArt,
  'Welcome! [Version 1.0.0]',
  'Type "help" for a list of available commands.',
  '--------------------------------------------------',
  '',
];

export default {
  name: 'welcome',
  description: 'Shows welcome message.',
  
  execute: (args, commands, context) => {
    return welcomeMessage.join("<br>")
  },
};