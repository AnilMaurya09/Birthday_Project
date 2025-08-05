function blowCandle() {
  document.getElementById('flame').classList.add('hidden');
  const smoke = document.getElementById('smoke');
  smoke.style.display = 'block';

  setTimeout(() => {
    smoke.style.display = 'none';
    showKnife();
  }, 1500);

  document.getElementById('instruction').textContent = "Click knife and drag it over cake to cut!";
}

function showKnife() {
  document.getElementById('knife').style.display = 'block';
}

// Knife Logic
const knife = document.getElementById('knife');
let isDragging = false, cutDone = false;

// Move knife into position on first click
knife.addEventListener('click', () => {
	debugger
  knife.classList.add('move');
  setTimeout(() => {
    knife.style.right = 'unset';
    knife.style.left = '50%';
     knife.style.top = '50%';
     knife.style.transform = 'translate(-50%, -50%) rotate(0deg)';
   }, 1500);
});

// Enable dragging
knife.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);

document.addEventListener('mousemove', (e) => {
  if (isDragging && !cutDone) {
    knife.style.left = e.pageX - 50 + "px";
    knife.style.top = e.pageY - 40 + "px";
    checkCut(e.pageX, e.pageY);
  }
});

knife.addEventListener('touchstart', () => isDragging = true);
document.addEventListener('touchend', () => isDragging = false);

document.addEventListener('touchmove', (e) => {
  if (isDragging && !cutDone) {
    const t = e.touches[0];
    knife.style.left = t.pageX - 50 + "px";
    knife.style.top = t.pageY - 40 + "px";
    checkCut(t.pageX, t.pageY);
  }
});

function checkCut(x, y) {
  const cakeRect = document.getElementById('cakeArea').getBoundingClientRect();
  if (x > cakeRect.left && x < cakeRect.right && y > cakeRect.top && y < cakeRect.bottom) {
    cutCake();
  }
}

function cutCake() {
  cutDone = true;
  isDragging = false;
  knife.style.display = 'none';

  setTimeout(() => {
    document.getElementById('leftHalf').style.transform = 'translateX(-150px)';
    document.getElementById('rightHalf').style.transform = 'translateX(150px)';
    for (let i = 0; i < 80; i++) createConfetti();
  }, 1000);

  playAudio('clap-sound');
  setTimeout(() => playAudio('happy-bday'), 2000);

  setTimeout(() => {
    document.getElementById('introOverlay').classList.add('hidden');
    document.getElementById('mainContent').style.opacity = 1;
    playAudio('bg-music');
	pauseAudio('happy-bday');
	
  }, 10000);
}

function playAudio(id) {
  const audio = document.getElementById(id);
  audio.play().catch(() => {
    document.addEventListener('click', () => audio.play(), { once: true });
  });
}
function pauseAudio(id) {
  const audio = document.getElementById(id);
  if (!audio.paused) {
    audio.pause();
  }
}


// Confetti
function createConfetti() {
  const div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.width = '10px';
  div.style.height = '10px';
  div.style.background = `hsl(${Math.random() * 360},100%,50%)`;
  div.style.top = '50%';
  div.style.left = '50%';
  document.body.appendChild(div);

  const x = (Math.random() - 0.5) * 600;
  const y = window.innerHeight + 50;

  div.animate([{ transform: `translate(0,0)` }, { transform: `translate(${x}px,${y}px)` }], {
    duration: 2000 + Math.random() * 3000,
    easing: 'ease-out'
  });

  setTimeout(() => div.remove(), 5000);
}

// Floating Gallery Random Motion
document.querySelectorAll('.floating-gallery img').forEach(img => {
  function randomize() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    const duration = 5000 + Math.random() * 5000;
    img.style.transition = `${duration}ms ease-in-out`;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    setTimeout(randomize, duration);
  }
  randomize();
});

// Lightbox
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').style.display = 'flex';
}
function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// Typewriter Effect
const texts = [
  "तुम मेरी मुस्कान हो...",
  "तुम मेरी दुनिया हो...",
  "तुम बिन सब अधूरा है...",
  "हमेशा तुम्हारी ख़ुशी मेरी दुआ है...",
  "Forever yours - Anil"
];
let i = 0, j = 0;
const typeEl = document.getElementById('typewriter');

(function type() {
  if (j < texts[i].length) {
    typeEl.textContent += texts[i].charAt(j);
    j++;
    setTimeout(type, 100);
  } else {
    setTimeout(() => {
      typeEl.textContent = '';
      i = (i + 1) % texts.length;
      j = 0;
      type();
    }, 1500);
  }
})();

// Popup
function showPopup() { document.getElementById('popup').style.display = 'flex'; }
function closePopup() { document.getElementById('popup').style.display = 'none'; }

// Counter since 9 May 2020
const startDate = new Date('2020-05-09');
const today = new Date();
const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
document.getElementById('counter').innerHTML = `हमारी कहानी शुरू हुई: 9 May 2020 से 💞 (${diff} दिन हो गए)`;

// Scratch effect
document.getElementById('scratchArea').addEventListener('mousemove', () => {
  document.getElementById('scratchArea').style.background = '#fff';
  document.getElementById('scratchArea').textContent = 'I Love You Jann Ummmmmmma ❤️';
});

// Music Controls
let tracks = ['audio/tumhiho.mp3', 'audio/tumhiho1.mp3'];
let currentTrack = 0;
let music = document.getElementById('bg-music');

function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}
function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  music.src = tracks[currentTrack];
  music.play();
}

// Voice Recognition Surprise
const micIcon = document.getElementById('micIcon');
if ('webkitSpeechRecognition' in window) {
  const rec = new webkitSpeechRecognition();
  rec.continuous = false;
  rec.lang = 'en-US';

  micIcon.addEventListener('click', () => {
    rec.start();
    micIcon.classList.add('mic-active');
  });

  rec.onresult = function (e) {
    const transcript = e.results[e.results.length - 1][0].transcript.trim().toLowerCase();
    if (transcript.includes('hello')) {
      rec.stop();
      showSurprise();
    }
  };

  rec.onend = function () {
    micIcon.classList.remove('mic-active');
  };
}

function showSurprise() {
  const surpriseContainer = document.getElementById('surpriseContainer');
  const surpriseAudio = document.getElementById('surpriseAudio');

  // Pause background music
  if (!music.paused) music.pause();

  surpriseContainer.style.display = 'flex';
  surpriseAudio.play();

  surpriseAudio.onended = () => {
    surpriseContainer.style.display = 'none';
    music.play(); // resume music
  };
}
