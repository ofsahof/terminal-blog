export const SIZE = 4;

export const createEmptyBoard = () =>
    Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

export const cloneBoard = (board) => board.map((row) => [...row]);

export const placeRandom = (board) => {
    const empty = [];
    for (let r = 0; r < SIZE; r += 1) {
        for (let c = 0; c < SIZE; c += 1) {
            if (board[r][c] === 0) empty.push([r, c]);
        }
    }
    if (empty.length === 0) return board;
    const [row, col] = empty[Math.floor(Math.random() * empty.length)];
    const next = cloneBoard(board);
    next[row][col] = Math.random() < 0.9 ? 2 : 4;
    return next;
};

const slideRow = (row) => {
    const filtered = row.filter((value) => value !== 0);
    let gained = 0;
    for (let i = 0; i < filtered.length - 1; i += 1) {
        if (filtered[i] === filtered[i + 1]) {
            filtered[i] *= 2;
            gained += filtered[i];
            filtered[i + 1] = 0;
        }
    }
    const compacted = filtered.filter((value) => value !== 0);
    while (compacted.length < SIZE) compacted.push(0);
    return { row: compacted, gained };
};

const rotateClockwise = (board) => {
    const next = createEmptyBoard();
    for (let r = 0; r < SIZE; r += 1) {
        for (let c = 0; c < SIZE; c += 1) {
            next[c][SIZE - 1 - r] = board[r][c];
        }
    }
    return next;
};

const rotateCounter = (board) => {
    let result = board;
    for (let i = 0; i < 3; i += 1) result = rotateClockwise(result);
    return result;
};

const slideLeft = (board) => {
    let gained = 0;
    const next = board.map((row) => {
        const slid = slideRow(row);
        gained += slid.gained;
        return slid.row;
    });
    return { board: next, gained };
};

export const move = (board, direction) => {
    let working = board;
    if (direction === 'up') working = rotateCounter(working);
    else if (direction === 'right') working = rotateClockwise(rotateClockwise(working));
    else if (direction === 'down') working = rotateClockwise(working);

    const { board: slid, gained } = slideLeft(working);

    let result = slid;
    if (direction === 'up') result = rotateClockwise(result);
    else if (direction === 'right') result = rotateClockwise(rotateClockwise(result));
    else if (direction === 'down') result = rotateCounter(result);

    return { board: result, gained };
};

export const boardsEqual = (a, b) => {
    for (let r = 0; r < SIZE; r += 1) {
        for (let c = 0; c < SIZE; c += 1) {
            if (a[r][c] !== b[r][c]) return false;
        }
    }
    return true;
};

export const hasMoves = (board) => {
    for (let r = 0; r < SIZE; r += 1) {
        for (let c = 0; c < SIZE; c += 1) {
            if (board[r][c] === 0) return true;
            if (c < SIZE - 1 && board[r][c] === board[r][c + 1]) return true;
            if (r < SIZE - 1 && board[r][c] === board[r + 1][c]) return true;
        }
    }
    return false;
};

export const initializeBoard = () => {
    let board = createEmptyBoard();
    board = placeRandom(board);
    board = placeRandom(board);
    return board;
};
