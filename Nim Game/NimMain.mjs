function initState(piles) {
    this.piles = piles;
}

function isTerminal() {
        return this.piles.every(pile => pile === 0);
    }

function evaluate() {
        let nimSum = this.piles.reduce((xor, pile) => xor ^ pile, 0);
        return nimSum === 0 ? 0 : 1;
    }

function generateChildNodes() {
        const childNodes = [];
        for (let pile = 0; pile < this.piles.length; pile++) {
            for (let stones = 1; stones <= this.piles[pile]; stones++) {
                const newPiles = [...this.piles];
                newPiles[pile] -= stones;
                childNodes.push(new NimState(newPiles));
            }
        }
        return childNodes;
    }

    function alphaBeta(node, depth, alpha, beta, maximizingPlayer) {
        if (depth === 0 || node.isTerminal()) {
            return evaluate(node);
        }
    
        if (maximizingPlayer) {
            let value = -Infinity;
            for (let childNode of node.generateChildNodes()) {
                value = Math.max(value, alphaBeta(childNode, depth - 1, alpha, beta, false));
                alpha = Math.max(alpha, value);
                if (beta <= alpha) {
                    break;
                }
            }
            return value;
        } else {
            let value = Infinity;
            for (let childNode of node.generateChildNodes()) {
                value = Math.min(value, alphaBeta(childNode, depth - 1, alpha, beta, true));
                beta = Math.min(beta, value);
                if (beta <= alpha) {
                    break;
                }
            }
            return value;
        }
    }
    
    function findOptimalMove(node, depth) {
        let bestValue = -Infinity;
        let bestMove = null;
    
        for (let childNode of node.generateChildNodes()) {
            let value = alphaBeta(childNode, depth - 1, -Infinity, Infinity, false);
    
            if (value > bestValue) {
                bestValue = value;
                bestMove = childNode;
            }
        }
    
        return bestMove;
    }
    
    function applyPlayerMove(currentState, move) {
        const { pileIndex, stones } = move;
        if (pileIndex >= 0 && pileIndex < currentState.length && currentState[pileIndex] >= stones) {
            return currentState.map((pile, index) => (index === pileIndex) ? pile - stones : pile);
        } else {
            console.log("Invalid move. Please enter a valid move.");
            return currentState;
        }
    }

export { initState, findOptimalMove, applyPlayerMove }