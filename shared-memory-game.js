class MemoryGame {
    constructor(containerId, dataGenerator, gameMode) {
        this.containerId = containerId;
        this.dataGenerator = dataGenerator;
        this.gameMode = gameMode;
        this.gameData = [];
        this.revealIndex = 0;
        this.gameInterval = null;

        this.setupHTML();
        this.loadSettings();
        this.setupEventListeners();
    }

    loadSettings() {
        if (!this.gameMode) return;
        const numItems = localStorage.getItem(`${this.gameMode}_num_items`);
        const duration = localStorage.getItem(`${this.gameMode}_duration_seconds`);

        if (numItems) {
            const numItemsInput = document.getElementById('num-items');
            if (numItemsInput) numItemsInput.value = numItems;
        }
        if (duration) {
            const durationInput = document.getElementById('duration');
            if (durationInput) durationInput.value = duration;
        }
    }

    saveSettings() {
        if (!this.gameMode) return;
        const numItemsInput = document.getElementById('num-items');
        const durationInput = document.getElementById('duration');

        if (numItemsInput) {
            localStorage.setItem(`${this.gameMode}_num_items`, numItemsInput.value);
        }
        if (durationInput) {
            localStorage.setItem(`${this.gameMode}_duration_seconds`, durationInput.value);
        }
    }

    setupHTML() {
        const container = document.getElementById(this.containerId);
        container.innerHTML = `
            <div class="game-mode-container">
                <div class="game-mode-card">
                    <h2>Number of Items</h2>
                    <input type="number" id="num-items" value="10" min="1" style="width: 80%; font-size: 1.2rem; text-align: center; margin-top: 10px; border-radius: 5px; border: 1px solid black;">
                </div>
                <div class="game-mode-card">
                    <h2>Time interval (s)</h2>
                    <input type="number" id="duration" value="5" min="0.1" step="0.1" style="width: 80%; font-size: 1.2rem; text-align: center; margin-top: 10px; border-radius: 5px; border: 1px solid black;">
                </div>
            </div>
            <div class="button-container" style="margin-top: 30px;">
                <button id="start-game-btn" style="padding: 15px 30px; font-size: 1.5rem; cursor: pointer; border: 2px solid black; background-color: white; color: black; font-weight: 700; transition: background-color 0.3s, color 0.3s; width: 200px; border-radius: 10px;">Start Game</button>
                <div id="flashcard-item" style="display: none; font-size: 4rem; color: black; background-color: white; padding: 40px; border-radius: 10px; border: 2px solid black; margin-top: 20px;"></div>
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

    setupEventListeners() {
        const addListener = (id, handler, event = 'click') => {
            const el = document.getElementById(id);
            if (el) el.addEventListener(event, handler);
        };

        addListener('start-game-btn', () => this.startGame());
        addListener('reveal-next-btn', () => this.revealNext());
        addListener('reveal-all-btn', () => this.revealAll());
        addListener('new-game-btn', () => this.resetGame());
        addListener('num-items', () => this.saveSettings(), 'input');
        addListener('duration', () => this.saveSettings(), 'input');
    }

    startGame() {
        this.saveSettings();
        let numItems = 10;
        const numItemsInput = document.getElementById('num-items');
        if (numItemsInput) {
            numItems = parseInt(numItemsInput.value, 10);
        }

        const duration = parseFloat(document.getElementById('duration').value) * 1000;

        if (isNaN(numItems) || numItems <= 0 || isNaN(duration) || duration <= 0) {
            alert('Please enter valid numbers for items and duration.');
            return;
        }

        const startBtn = document.getElementById('start-game-btn');
        const flashcard = document.getElementById('flashcard-item');

        startBtn.style.display = 'none';
        flashcard.style.display = 'block';

        this.gameData = this.dataGenerator(numItems);
        this.revealIndex = 0;
        let currentIndex = 0;

        const showNextItem = () => {
            if (currentIndex < this.gameData.length) {
                flashcard.textContent = this.gameData[currentIndex++];
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

    revealNext() {
        if (this.revealIndex < this.gameData.length) {
            const revealedDiv = document.getElementById('revealed-items');
            revealedDiv.style.display = 'block';

            const itemElement = document.createElement('div');
            itemElement.textContent = `${this.revealIndex + 1}. ${this.gameData[this.revealIndex]}`;
            itemElement.style.margin = '5px 0';
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
        revealedDiv.style.display = 'block';
        revealedDiv.innerHTML = '';

        this.gameData.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${index + 1}. ${item}`;
            itemElement.style.margin = '5px 0';
            revealedDiv.appendChild(itemElement);
        });

        document.getElementById('reveal-buttons').style.display = 'none';
    }

    resetGame() {
        // Clear any running interval
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }

        // Reset all display states
        document.getElementById('start-game-btn').style.display = 'none';
        document.getElementById('flashcard-item').style.display = 'none';
        document.getElementById('reveal-buttons').style.display = 'none';
        document.getElementById('revealed-items').style.display = 'none';
        document.getElementById('new-game-container').style.display = 'none';
        document.getElementById('revealed-items').innerHTML = '';
        document.getElementById('reveal-next-btn').style.display = 'inline-block';
        document.getElementById('reveal-all-btn').style.display = 'inline-block';
        document.getElementById('reveal-next-btn').textContent = 'Reveal First';
        this.gameData = [];
        this.revealIndex = 0;

        // Automatically start new game
        this.startGame();
    }
}

// Make it available globally
window.MemoryGame = MemoryGame;