document.addEventListener("DOMContentLoaded", function() {
    const url = new URLSearchParams(window.location.search);
    const score = url.get('score');
    const timeSpent = url.get('time');

    document.getElementById('final-score').innerHTML = score;
    document.getElementById('total-time').innerHTML = timeSpent + " seconds";
    document.getElementById('best-score').innerHTML = localStorage.getItem('bestScore') || 0;
    document.getElementById('best-time').innerHTML = localStorage.getItem('bestTime') || 0 + " seconds" ;

    if (localStorage.getItem('isBestScore') === "1") {
        document.getElementById('message').innerHTML = "LILY says CONGRATS, you beat your record!";
        localStorage.setItem('isBestScore', "0");
    }

    document.getElementById('restart-button').addEventListener('click', () => {
        document.getElementById('message').innerHTML = "";
        window.location.href = "game.html?start=true&score=0";
    });

    document.getElementById('home-button').addEventListener('click', () => {
        document.getElementById('message').innerHTML = "";
        window.location.href = "index.html";
    });
});

