const availableGames = ['snake']; 

export default {
  name: 'play',
  description: `Launch a game. Available: ${availableGames.join(', ')}`,

  execute: (args) => {
    if (args.length === 0) {
      return `Usage: play [game_name]\nAvailable: ${availableGames.join(', ')}`;
    }

    const gameName = args[0].toLowerCase();

    if (!availableGames.includes(gameName)) {
      return `Error: Game "${gameName}" not found. Available: ${availableGames.join(', ')}`;
    }

    return {
      isViewChange: true,
      newView: 'game',
      gameName: gameName, 
    };
  },
};