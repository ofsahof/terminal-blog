import clearCommand from './clear';
import helpCommand from './help';
import lsCommand from './ls';   
import catCommand from './cat'; 
import cdCommand from './cd';
import manCommand from './man';
import themeCommand from './theme';
import neofetchCommand from './neofetch';
import welcomeCommand from "./welcome";
import playCommand from "./play";

export const commands = {
  clear: clearCommand,
  help: helpCommand,
  ls: lsCommand,
  cat: catCommand,
  cd: cdCommand,
  man: manCommand,          
  theme: themeCommand,      
  neofetch: neofetchCommand,
  welcome: welcomeCommand,
  play: playCommand
};