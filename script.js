document.getElementById('start-btn').addEventListener('click', () => {
    window.location.href = 'menu.html';
});

const helpBtn = document.getElementById('help-btn');
const modal = document.getElementById('help-modal');
const closeBtn = document.getElementsByClassName('close-btn')[0];

helpBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 