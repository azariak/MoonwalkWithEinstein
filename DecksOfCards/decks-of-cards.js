class DeckOfCardsGame extends MemoryGame {
    constructor(containerId) {
        super(containerId, null, 'deck_of_cards');
        // Override the data generator since we handle it differently
        this.dataGenerator = this.generateDeckData.bind(this);
    }

    setupHTML() {
        const container = document.getElementById(this.containerId);
        container.innerHTML = `
            <div class="game-mode-container">
                <div class="game-mode-card">
                    <h2>Deck Size</h2>
                    <select id="deck-size" style="width: 100%; max-width: 300px; font-size: 1.2rem; text-align: center; margin-top: 10px; border-radius: 5px; border: 1px solid black; padding: 5px;">
                        <option value="0.25">1/4 Deck (13 cards)</option>
                        <option value="0.5">1/2 Deck (26 cards)</option>
                        <option value="1" selected>1 Deck (52 cards)</option>
                        <option value="2">2 Decks (104 cards)</option>
                        <option value="3">3 Decks (156 cards)</option>
                        <option value="4">4 Decks (208 cards)</option>
                        <option value="5">5 Decks (260 cards)</option>
                        <option value="6">6 Decks (312 cards)</option>
                        <option value="7">7 Decks (364 cards)</option>
                        <option value="8">8 Decks (416 cards)</option>
                        <option value="9">9 Decks (468 cards)</option>
                        <option value="10">10 Decks (520 cards)</option>
                    </select>
                </div>
                <div class="game-mode-card">
                    <h2>Time interval (s)</h2>
                    <input type="number" id="duration" value="1" min="0.1" step="0.1" style="width: 100%; max-width: 300px; font-size: 1.2rem; text-align: center; margin-top: 10px; border-radius: 5px; border: 1px solid black;">
                </div>
            </div>
            <div class="button-container" style="margin-top: 30px;">
                <button id="start-game-btn" style="padding: 15px 30px; font-size: 1.5rem; cursor: pointer; border: 2px solid black; background-color: white; color: black; font-weight: 700; transition: background-color 0.3s, color 0.3s; width: 200px; border-radius: 10px;">Start Game</button>
                <div id="flashcard-item" style="display: none; width: 240px; height: 336px; font-size: 5rem; color: black; background-color: white; border-radius: 15px; border: 2px solid #333; box-shadow: 5px 5px 15px rgba(0,0,0,0.2); margin: 20px auto; align-items: center; justify-content: center; user-select: none;"></div>
                <div id="reveal-buttons" style="display: none; margin-top: 20px;">
                    <button id="reveal-next-btn" style="padding: 10px 20px; font-size: 1.2rem; cursor: pointer; border: 2px solid black; background-color: white; color: black; font-weight: 700; border-radius: 10px; margin-right: 10px;">Reveal First</button>
                    <button id="reveal-all-btn" style="padding: 10px 20px; font-size: 1.2rem; cursor: pointer; border: 2px solid black; background-color: white; color: black; font-weight: 700; border-radius: 10px;">Reveal All</button>
                </div>
                <div id="revealed-items" style="display: none; margin-top: 20px; text-align: left; background-color: white; padding: 20px; border-radius: 10px; border: 2px solid black;"></div>
                <div id="new-game-container" style="display: none; margin-top: 20px;">
                    <button id="new-game-btn" style="padding: 15px 30px; font-size: 1.5rem; cursor: pointer; border: 2px solid black; background-color: white; color: black; font-weight: 700; border-radius: 10px;">New Game</button>
                </div>
            </div>
        `;
    }

    loadSettings() {
        const deckSize = localStorage.getItem(`${this.gameMode}_deck_size`);
        const duration = localStorage.getItem(`${this.gameMode}_duration_seconds`);

        if (deckSize) {
            document.getElementById('deck-size').value = deckSize;
        }
        if (duration) {
            document.getElementById('duration').value = duration;
        }
    }

    saveSettings() {
        const deckSize = document.getElementById('deck-size').value;
        const duration = document.getElementById('duration').value;

        localStorage.setItem(`${this.gameMode}_deck_size`, deckSize);
        localStorage.setItem(`${this.gameMode}_duration_seconds`, duration);
    }

    setupEventListeners() {
        super.setupEventListeners();
        // Remove the old listener for num-items since it doesn't exist
        // Add listener for deck-size
        const deckSizeInput = document.getElementById('deck-size');
        if (deckSizeInput) {
            deckSizeInput.addEventListener('change', () => this.saveSettings());
        }
    }

    startGame() {
        this.saveSettings();
        const deckSize = parseFloat(document.getElementById('deck-size').value);
        const duration = parseFloat(document.getElementById('duration').value) * 1000;

        if (isNaN(duration) || duration <= 0) {
            alert('Please enter a valid duration.');
            return;
        }

        const startBtn = document.getElementById('start-game-btn');
        const flashcard = document.getElementById('flashcard-item');

        startBtn.style.display = 'none';

        this.gameData = this.generateDeckData(deckSize);
        this.revealIndex = 0;
        let currentIndex = 0;

        const showNextItem = () => {
            if (currentIndex < this.gameData.length) {
                flashcard.textContent = this.gameData[currentIndex++];
                // Add card styling/color if needed
                if (flashcard.textContent.includes('♥') || flashcard.textContent.includes('♦')) {
                    flashcard.style.color = '#e44145'; // Better red
                } else {
                    flashcard.style.color = '#2d2d2d'; // Better black
                }
                // Only show after content is set
                if (flashcard.style.display !== 'flex') {
                    flashcard.style.display = 'flex';
                }
            } else {
                flashcard.style.display = 'none';
                document.getElementById('reveal-buttons').style.display = 'block';
                document.getElementById('new-game-container').style.display = 'block';
                document.getElementById('reveal-next-btn').textContent = 'Reveal First';
                clearInterval(this.gameInterval);
            }
        };

        showNextItem();
        this.gameInterval = setInterval(showNextItem, duration);
    }

    generateDeckData(deckSize) {
        const suits = ['♠', '♥', '♦', '♣']; // Spades, Hearts, Diamonds, Clubs
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let fullDeck = [];

        for (let suit of suits) {
            for (let value of values) {
                fullDeck.push(`${value}${suit}`);
            }
        }

        let cards = [];
        const numDecks = Math.ceil(deckSize);
        const totalCardsNeeded = Math.round(deckSize * 52);

        // Generate enough full decks
        for (let i = 0; i < numDecks; i++) {
            cards = cards.concat([...fullDeck]);
        }

        // Shuffle
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        // Take the required number of cards
        // If deckSize is fractional (e.g., 0.25 or 0.5), we just take the first N cards from a shuffled single deck.
        // This ensures no duplicates if deckSize <= 1.
        // If deckSize > 1, we might have duplicates, but that's expected for multiple decks.
        return cards.slice(0, totalCardsNeeded);
    }

    revealNext() {
        if (this.revealIndex < this.gameData.length) {
            const revealedDiv = document.getElementById('revealed-items');

            // Set up grid layout on first reveal
            if (this.revealIndex === 0) {
                revealedDiv.style.display = 'grid';
                revealedDiv.classList.add('grid-active');
                revealedDiv.innerHTML = '';
            }

            const item = this.gameData[this.revealIndex];
            const itemElement = document.createElement('div');
            itemElement.textContent = `${this.revealIndex + 1}. ${item}`;
            itemElement.className = 'revealed-card';

            // Add color logic
            if (item.includes('♥') || item.includes('♦')) {
                itemElement.classList.add('red');
            } else {
                itemElement.classList.add('black');
            }
            revealedDiv.appendChild(itemElement);

            this.revealIndex++;

            if (this.revealIndex === 1) {
                document.getElementById('reveal-next-btn').textContent = 'Reveal Next';
            }

            if (this.revealIndex >= this.gameData.length) {
                document.getElementById('reveal-buttons').style.display = 'none';
            }
        }
    }

    revealAll() {
        const revealedDiv = document.getElementById('revealed-items');
        revealedDiv.style.display = 'grid';
        revealedDiv.classList.add('grid-active');
        revealedDiv.innerHTML = '';

        this.gameData.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${index + 1}. ${item}`;
            itemElement.className = 'revealed-card';

            // Add color logic
            if (item.includes('♥') || item.includes('♦')) {
                itemElement.classList.add('red');
            } else {
                itemElement.classList.add('black');
            }
            revealedDiv.appendChild(itemElement);
        });

        document.getElementById('reveal-buttons').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DeckOfCardsGame('game-container');
});
