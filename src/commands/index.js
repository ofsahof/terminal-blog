import clearCommand from './clear';
import helpCommand from './help';
import lsCommand from './ls';   
import catCommand from './cat'; 
import cdCommand from './cd';

export const commands = {
  clear: clearCommand,
  help: helpCommand,
  ls: lsCommand,
  cat: catCommand,
  cd: cdCommand,
};