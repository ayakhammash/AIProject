document.addEventListener('DOMContentLoaded', () => {
    const gameStateElement = document.getElementById('game-state');
    const moveForm = document.getElementById('move-form');
    const messageElement = document.getElementById('message');

    const updateGameState = async () => {
        const response = await fetch('/start', { method: 'POST' });
        const data = await response.json();
        gameStateElement.textContent = `Game State: ${data.state.piles.join(', ')}`;
    };

    const makeMove = async (pileIndex, stones) => {
        const response = await fetch('/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ move: { pileIndex, stones } }),
        });

        const data = await response.json();
        if (response.ok) {
        } else if (data.error) {
            messageElement.textContent = `Error: ${data.error}`;
        } else {
            messageElement.textContent = 'Unknown error occurred.';
        }
        

        updateGameState();
    };

    updateGameState();

    moveForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const pileIndex = parseInt(document.getElementById('pileIndex').value, 10);
        const stones = parseInt(document.getElementById('stones').value, 10);

        if (!isNaN(pileIndex) && !isNaN(stones)) {
            makeMove(pileIndex, stones);
        } else {
            messageElement.textContent = 'Invalid input. Please enter valid numbers.';
        }
    });
});
