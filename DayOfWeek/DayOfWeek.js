document.addEventListener('DOMContentLoaded', () => {
    const dateDisplay = document.getElementById('date-display');
    const choicesContainer = document.getElementById('choices-container');
    const resultContainer = document.getElementById('result-container');
    const nextDateBtn = document.getElementById('next-date-btn');
    const gameTitle = document.querySelector('#game-container h1');

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let correctAnswer;

    function getRandomDate() {
        const start = new Date(1800, 0, 1);
        const end = new Date(2200, 11, 31);
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate;
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function generateNewDate() {
        const date = getRandomDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date

        if (date < today) {
            gameTitle.textContent = "What day of the week was";
        } else {
            gameTitle.textContent = "What day of the week will it be";
        }

        dateDisplay.textContent = formatDate(date);
        correctAnswer = daysOfWeek[date.getDay()];

        choicesContainer.innerHTML = '';
        resultContainer.textContent = '';
        nextDateBtn.style.visibility = 'hidden';

        daysOfWeek.forEach(day => {
            const button = document.createElement('button');
            button.textContent = day;
            button.classList.add('choice-btn');
            button.addEventListener('click', () => checkAnswer(day, button));
            choicesContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedDay, button) {
        // Disable all buttons after a choice is made
        document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

        if (selectedDay === correctAnswer) {
            resultContainer.textContent = "Correct!";
            resultContainer.style.color = 'green';
            button.classList.add('correct');
            // In a real scenario, you might update a score here
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const date = new Date(dateDisplay.textContent);
            const tense = date < today ? 'was' : 'will be';
            resultContainer.textContent = `Wrong! It ${tense} ${correctAnswer}.`;
            resultContainer.style.color = 'red';
            button.classList.add('incorrect');
            // Highlight the correct answer
            document.querySelectorAll('.choice-btn').forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        }
        nextDateBtn.style.visibility = 'visible';
    }

    nextDateBtn.addEventListener('click', generateNewDate);

    // Initial load
    generateNewDate();
}); 