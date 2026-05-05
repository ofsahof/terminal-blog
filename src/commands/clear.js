import { asClearResult } from '../utils/commandResult';

export default {
    name: 'clear',
    description: 'Clears the terminal screen.',

    execute: () => {
        return asClearResult();
    },
};
