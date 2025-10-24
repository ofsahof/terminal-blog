import { useEffect, useReducer, useRef } from 'react';

const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const TILE_SIZE = CANVAS_SIZE / GRID_SIZE;

const initialState = {
    snake: [{ x: 10, y: 10 }],
    food: createFood([{ x: 10, y: 10 }]),
    direction: 'RIGHT',
    isGameOver: false,
    score: 0,
};

function createFood(snakeBody) {
    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
        let onSnake = snakeBody.some(
            (segment) => segment.x === newFood.x && segment.y === newFood.y
        );
        if (!onSnake) break;
    }
    return newFood;
}

function gameReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_DIRECTION': {
            const { direction } = state;
            if (
                (action.payload === 'UP' && direction === 'DOWN') ||
                (action.payload === 'DOWN' && direction === 'UP') ||
                (action.payload === 'LEFT' && direction === 'RIGHT') ||
                (action.payload === 'RIGHT' && direction === 'LEFT')
            ) {
                return state;
            }
            return { ...state, direction: action.payload };
        }
        case 'GAME_TICK': {
            if (state.isGameOver) return state;

            const newSnake = [...state.snake];
            const head = { ...newSnake[0] };

            switch (state.direction) {
                case 'UP':
                    head.y -= 1;
                    break;
                case 'DOWN':
                    head.y += 1;
                    break;
                case 'LEFT':
                    head.x -= 1;
                    break;
                case 'RIGHT':
                    head.x += 1;
                    break;
            }

            if (
                head.x < 0 ||
                head.x >= GRID_SIZE ||
                head.y < 0 ||
                head.y >= GRID_SIZE
            ) {
                return { ...state, isGameOver: true };
            }
            for (let i = 1; i < newSnake.length; i++) {
                if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                    return { ...state, isGameOver: true };
                }
            }

            newSnake.unshift(head);

            if (head.x === state.food.x && head.y === state.food.y) {
                return {
                    ...state,
                    snake: newSnake,
                    food: createFood(newSnake),
                    score: state.score + 10,
                };
            } else {
                newSnake.pop();
                return { ...state, snake: newSnake };
            }
        }
        case 'RESET_GAME': {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export default function SnakeGame({ onExit }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const canvasRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onExit();
            } else if (e.key === 'ArrowUp') {
                dispatch({ type: 'CHANGE_DIRECTION', payload: 'UP' });
            } else if (e.key === 'ArrowDown') {
                dispatch({ type: 'CHANGE_DIRECTION', payload: 'DOWN' });
            } else if (e.key === 'ArrowLeft') {
                dispatch({ type: 'CHANGE_DIRECTION', payload: 'LEFT' });
            } else if (e.key === 'ArrowRight') {
                dispatch({ type: 'CHANGE_DIRECTION', payload: 'RIGHT' });
            } else if (e.key === 'r' || e.key === 'R') {
                if (state.isGameOver) {
                    dispatch({ type: 'RESET_GAME' });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onExit, state.isGameOver]);

    useEffect(() => {
        if (state.isGameOver) return;

        const gameInterval = setInterval(() => {
            dispatch({ type: 'GAME_TICK' });
        }, 200);

        return () => {
            clearInterval(gameInterval);
        };
    }, [state.isGameOver]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const style = getComputedStyle(document.body);
        const bgColor = style.getPropertyValue('--bg') || '#1d2021';
        const snakeColor = style.getPropertyValue('--green') || '#a9b665';
        const foodColor = style.getPropertyValue('--red') || '#ea6962';
        const textColor = style.getPropertyValue('--fg') || '#d4be98';

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        ctx.fillStyle = foodColor;
        ctx.fillRect(
            state.food.x * TILE_SIZE,
            state.food.y * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
        );

        ctx.fillStyle = snakeColor;
        state.snake.forEach((segment) => {
            ctx.fillRect(
                segment.x * TILE_SIZE,
                segment.y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );
        });

        if (state.isGameOver) {
            ctx.fillStyle = textColor;
            ctx.font = '40px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 20);
            ctx.font = '20px monospace';
            ctx.fillText(
                `Score: ${state.score}`,
                CANVAS_SIZE / 2,
                CANVAS_SIZE / 2 + 20
            );
            ctx.font = '16px monospace';
            ctx.fillText(
                "Press 'R' to play again",
                CANVAS_SIZE / 2,
                CANVAS_SIZE / 2 + 50
            );
        }
    }, [state.snake, state.food, state.isGameOver, state.score]);

    return (
        <div className='game-view'>
            <h2 className='game-view__title'>Snake</h2>
            <h3 className='game-view__score'>Score: {state.score}</h3>

            <canvas
                ref={canvasRef}
                id='game-canvas'
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className='game-view__canvas'
            ></canvas>

            <p className='game-view__instructions'>
                Press 'ESC' to return to terminal.
            </p>
        </div>
    );
}
