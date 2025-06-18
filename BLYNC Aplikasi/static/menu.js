console.log("menu.js dimuat");
console.log("Jumlah suara tersedia:", window.speechSynthesis.getVoices().length);

window.addEventListener('DOMContentLoaded', function () {
  const speak = (text, delay = 0) => {
    setTimeout(() => {
      const msg = new SpeechSynthesisUtterance();
      msg.lang = 'id-ID';
      msg.rate = 1;
      msg.pitch = 1;
      msg.text = text;
      console.log("Menyuarakan:", msg.text);
      window.speechSynthesis.speak(msg);
    }, delay);
  };

  window.speechSynthesis.cancel();

  speak("Selamat datang di aplikasi BLYNC.", 500);  
  speak("Aplikasi ini dirancang untuk membantu Anda belajar mengetik huruf Braille secara digital.", 3000);
  speak("Silakan pilih salah satu menu berikut.", 6000);
  speak("Tutorial huruf bisa ditekan di bagian atas.", 9000);
  speak("Tutorial angka bisa ditekan di bagian tengah.", 12000);
  speak("Tutorial tanda baca bisa ditekan di bagian bawah.", 15000);
  speak("Selamat belajar.", 18000);
});
