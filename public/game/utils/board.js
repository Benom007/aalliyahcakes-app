export const BOARD_SIZE = 8;
export const CANDY_TYPES = ['🍰', '🧁', '🍪', '🍫', '🍬', '🍭'];

export function createBoard() {
    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
        }
    }
    return board;
}

export function isAdjacent(row1, col1, row2, col2) {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

export function checkMatch(board, row1, col1, row2, col2, row3, col3) {
    return board[row1][col1] === board[row2][col2] && 
           board[row2][col2] === board[row3][col3];
}