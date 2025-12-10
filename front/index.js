const word = "MyDoctor"; // en minuscule
const title = document.getElementById("title");

let index = 0;

function animateWord() {
  if (index < word.length) {
    let char = word[index];
    if (index === 0) char = char.toUpperCase(); // M majuscule
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('letter');
    span.style.animationDelay = `${index * 0.2}s`;
    title.appendChild(span);
    title.style.opacity = 1;
    index++;
    setTimeout(animateWord, 150);
  }
}
animateWord();

// Redirection automatique après 2 secondes (modifiable)
setTimeout(() => {
  window.location.href = "1.html";
}, 4000);