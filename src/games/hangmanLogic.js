export const MAX_WRONG = 6;

export const HANGMAN_WORDS = [
    'react',
    'vite',
    'terminal',
    'javascript',
    'developer',
    'keyboard',
    'function',
    'github',
    'ofsahof',
    'snake',
];

export const initialHangmanState = (word) => ({
    word: word.toLowerCase(),
    guessed: [],
    wrong: 0,
    status: 'playing',
});

export const guessLetter = (state, rawLetter) => {
    if (state.status !== 'playing') return state;
    const letter = rawLetter.toLowerCase();
    if (!/^[a-z]$/.test(letter) || state.guessed.includes(letter)) {
        return state;
    }

    const guessed = [...state.guessed, letter];
    const isHit = state.word.includes(letter);
    const wrong = state.wrong + (isHit ? 0 : 1);
    const isWon = state.word
        .split('')
        .every((char) => guessed.includes(char));
    const isLost = wrong >= MAX_WRONG;
    let status = 'playing';
    if (isWon) status = 'won';
    else if (isLost) status = 'lost';

    return { ...state, guessed, wrong, status };
};

export const renderMaskedWord = (state) =>
    state.word
        .split('')
        .map((char) => (state.guessed.includes(char) ? char : '_'))
        .join(' ');

export const pickRandomWord = (rng = Math.random) =>
    HANGMAN_WORDS[Math.floor(rng() * HANGMAN_WORDS.length)];
