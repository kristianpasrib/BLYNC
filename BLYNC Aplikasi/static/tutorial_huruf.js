const brailleDots = document.querySelectorAll('.dot');
const output = document.getElementById("output");
const middleArea = document.getElementById("middle-area");

let activeDots = new Set();
let touchTimeout = null;
let hurufIndex = 0;

const hurufList = [
  { char: "a", dots: "1" }, { char: "b", dots: "12" }, { char: "c", dots: "14" },
  { char: "d", dots: "145" }, { char: "e", dots: "15" }, { char: "f", dots: "124" },
  { char: "g", dots: "1245" }, { char: "h", dots: "125" }, { char: "i", dots: "24" },
  { char: "j", dots: "245" }, { char: "k", dots: "13" }, { char: "l", dots: "123" },
  { char: "m", dots: "134" }, { char: "n", dots: "1345" }, { char: "o", dots: "135" },
  { char: "p", dots: "1234" }, { char: "q", dots: "12345" }, { char: "r", dots: "1235" },
  { char: "s", dots: "234" }, { char: "t", dots: "2345" }, { char: "u", dots: "136" },
  { char: "v", dots: "1236" }, { char: "w", dots: "2456" }, { char: "x", dots: "1346" },
  { char: "y", dots: "13456" }, { char: "z", dots: "1356" },
];

function speak(text, delay = 0) {
  setTimeout(() => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "id-ID";
    speechSynthesis.speak(msg);
  }, delay);
}

function resetDots() {
  activeDots.clear();
  brailleDots.forEach(dot => dot.classList.remove('active'));
}

function handleTouchStart(dot) {
  dot.classList.add('active');
  activeDots.add(dot.dataset.dot);
  navigator.vibrate(50);

  if (touchTimeout) clearTimeout(touchTimeout);
  touchTimeout = setTimeout(checkInput, 500);
}

function checkInput() {
  const sorted = Array.from(activeDots).sort().join('');
  const current = hurufList[hurufIndex];

  if (sorted === current.dots) {
    output.textContent += current.char;
    speak(`Benar. ${current.char}`);
    hurufIndex++;
    if (hurufIndex < hurufList.length) {
      updateCurrentLetterDisplay();

      setTimeout(() => {
        speak(`Ketik ${hurufList[hurufIndex].dots.split('').join(' ')} untuk huruf ${hurufList[hurufIndex].char}`);
      }, 1000);
    } else {
      speak("Tutorial selesai.");
    }
  } else {
    speak("Salah. Coba lagi.");
    navigator.vibrate([100, 30, 100]);
  }

  resetDots();
}

// ===== Voice Panduan Awal (dengan jeda transisi antar langkah) =====
window.addEventListener('DOMContentLoaded', () => {
  window.speechSynthesis.cancel(); // stop suara sebelumnya

  setTimeout(() => {
    speak("Selamat datang di tutorial huruf.");
    speak("Sebelum mulai, silakan miringkan ponsel Anda ke posisi horizontal.", 3000);
    speak(`Ketik ${hurufList[hurufIndex].dots.split('').join(' ')} untuk huruf ${hurufList[hurufIndex].char}`, 8000);
    updateCurrentLetterDisplay();
  }, 200); // jeda kecil agar DOM dan speech engine siap
});


// Event listener titik sentuh
brailleDots.forEach(dot => {
  dot.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleTouchStart(dot);
  });
  dot.addEventListener('touchend', (e) => e.preventDefault());
});

function updateCurrentLetterDisplay() {
  const current = hurufList[hurufIndex];
  document.getElementById('current-letter').textContent = `Huruf: ${current.char.toUpperCase()}`;
}

