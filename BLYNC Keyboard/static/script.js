const brailleDots = document.querySelectorAll('.dot');
const middleArea = document.getElementById("middle-area");
const output = document.getElementById("output");
const sentMessages = document.getElementById("sent-messages");

let activeDots = new Set();
let touchTimeout = null;
let numberPrefixActive = false;

const brailleMap = {
  "1": "a", "12": "b", "14": "c", "145": "d", "15": "e",
  "124": "f", "1245": "g", "125": "h", "24": "i", "245": "j",
  "13": "k", "123": "l", "134": "m", "1345": "n", "135": "o",
  "1234": "p", "12345": "q", "1235": "r", "234": "s", "2345": "t",
  "136": "u", "1236": "v", "2456": "w", "1346": "x", "13456": "y", "1356": "z",
  "3456-1": "1", "3456-12": "2", "3456-14": "3", "3456-145": "4", "3456-15": "5",
  "3456-124": "6", "3456-1245": "7", "3456-125": "8", "3456-24": "9", "3456-245": "0",
  "2": ",", "23": ";", "25": ":", "256": ".", "235": "!", "236": "?", "34": "/",
};

function handleTouchStart(dot) {
  dot.classList.add('active');
  activeDots.add(dot.dataset.dot);
  navigator.vibrate(50);

  if (touchTimeout) clearTimeout(touchTimeout);
  touchTimeout = setTimeout(processBrailleInput, 400);
}

function resetDots() {
  activeDots.clear();
  brailleDots.forEach(dot => dot.classList.remove('active'));
}

function processBrailleInput() {
  const sorted = Array.from(activeDots).sort();
  const key = sorted.join('');
  let finalKey = key;
  let charResult = brailleMap[key];

  if (numberPrefixActive) {
    finalKey = "3456-" + key;
    charResult = brailleMap[finalKey];
    numberPrefixActive = false;
  }

  if (key === "3456") {
    numberPrefixActive = true;
    speak("Tekan angka");
    resetDots();
    return;
  }

  if (!charResult) {
    speak("Karakter tidak ada");
    navigator.vibrate([100, 30, 100]);
  } else {
    speak(charResult);
    output.textContent += charResult;
  }

  resetDots();
}

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "id-ID";
  speechSynthesis.speak(msg);
}

let swipeStartX = null;
let swipeStartY = null;

function handleSwipeStart(e) {
  if (e.changedTouches.length === 1) {
    swipeStartX = e.changedTouches[0].clientX;
    swipeStartY = e.changedTouches[0].clientY;
  }
}

function handleSwipeEnd(e) {
  if (swipeStartX === null || swipeStartY === null) return;
  const swipeEndX = e.changedTouches[0].clientX;
  const swipeEndY = e.changedTouches[0].clientY;

  const deltaX = swipeEndX - swipeStartX;
  const deltaY = swipeEndY - swipeStartY;

  if (deltaX > 50) {
    output.textContent += " ";
    speak("spasi");
    navigator.vibrate(70);
  } else if (deltaX < -50) {
    output.textContent = output.textContent.slice(0, -1);
    speak("hapus");
    navigator.vibrate([30, 30, 30]);
} else if (deltaY < -50) {
  const message = output.textContent.trim();
  if (message) {
    sentMessages.textContent = message;
    speak(message);
    output.textContent = "";
    navigator.vibrate([100, 50, 100]);
  } else {
    speak("tidak ada pesan");
  }
}


  swipeStartX = null;
  swipeStartY = null;
}

brailleDots.forEach(dot => {
  dot.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleTouchStart(dot);
  });
  dot.addEventListener('touchend', (e) => e.preventDefault());
});

middleArea.addEventListener("touchstart", handleSwipeStart);
middleArea.addEventListener("touchend", handleSwipeEnd);
