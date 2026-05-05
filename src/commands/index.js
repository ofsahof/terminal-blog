import clearCommand from './clear';
import helpCommand from './help';
import lsCommand from './ls';
import catCommand from './cat';
import cdCommand from './cd';
import manCommand from './man';
import themeCommand from './theme';
import neofetchCommand from './neofetch';
import playCommand from './play';
import githubCommand from './github';
import weatherCommand from './weather';
import fetchCommand from './fetch';
import mkdirCommand from './mkdir';
import touchCommand from './touch';
import rmCommand from './rm';
import echoCommand from './echo';
import grepCommand from './grep';
import treeCommand from './tree';
import historyCommand from './history';
import cowsayCommand from './cowsay';

export const commands = {
    clear: clearCommand,
    help: helpCommand,
    ls: lsCommand,
    cat: catCommand,
    cd: cdCommand,
    man: manCommand,
    theme: themeCommand,
    neofetch: neofetchCommand,
    play: playCommand,
    github: githubCommand,
    weather: weatherCommand,
    fetch: fetchCommand,
    mkdir: mkdirCommand,
    touch: touchCommand,
    rm: rmCommand,
    echo: echoCommand,
    grep: grepCommand,
    tree: treeCommand,
    history: historyCommand,
    cowsay: cowsayCommand,
};
