function printHighscores() {
  // get scores from localstorage
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  // resort hs in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    // create list tag for each high score
    var liTag = document.createElement('li');
    liTag.textContent = score.initials + " - " + score.score;

    // display hs - ordered list element
    var olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  });
}
// clear hs
function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}
// clear hs button
document.getElementById('clear').onclick = clearHighscores;

// printhighscore
printHighscores();
  