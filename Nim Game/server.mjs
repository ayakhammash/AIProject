import express from 'express';
const app = express();
const port = 3000;

// Assuming initState is inside NimMain.js
import { initState, findOptimalMove, applyPlayerMove } from './NimMain.mjs';

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/start', (req, res) => {
    const initialState = initState([3, 4, 5]);
    res.json({ state: initialState });
});

app.post('/move', (req, res) => {
    // Player move
    const initialState = initState([3, 4, 5]); // Add the initial state
    const playerMove = req.body.move;
    const playerUpdatedState = initState(applyPlayerMove(initialState.piles, playerMove));

    // AI move
    const optimalMove = findOptimalMove(playerUpdatedState, 3);
    const aiUpdatedState = initState(optimalMove.piles);

    res.json({ playerState: playerUpdatedState, aiState: aiUpdatedState });
});

