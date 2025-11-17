// Elements
const loginPage = document.getElementById('loginPage');
const mainPage = document.getElementById('mainPage');
const form = document.getElementById('loginForm');
const passwordInput = document.getElementById('passwordInput');
const errorMsg = document.getElementById('errorMsg');
const card = document.getElementById('photoCard');
const bubblesContainer = document.querySelector('.bubbles');

// Password baru
const correctPassword = "EKOPLATR";

// Login form submit handler with smooth transition
form.addEventListener('submit', e => {
  e.preventDefault();
  errorMsg.textContent = '';
  if (passwordInput.value === correctPassword) {
    loginPage.style.transition = 'opacity 0.8s ease';
    loginPage.style.opacity = '0';
    setTimeout(() => {
      loginPage.style.display = 'none';
      mainPage.style.display = 'flex';
      mainPage.style.opacity = '0';
      mainPage.style.transition = 'opacity 0.8s ease';
      setTimeout(() => {
        mainPage.style.opacity = '1';
        mainPage.setAttribute('aria-hidden', 'false');
      }, 50);
    }, 850);
  } else {
    errorMsg.textContent = 'Password salah. Coba lagi!';
    passwordInput.value = '';
    passwordInput.focus();
  }
});

// --- Drag & rotate card implementation ---

let isDragging = false;
let startX, startY;
let currentRotationX = 0;
let currentRotationY = 0;

// Buat buih air kecil di sekitar kartu saat drag
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  const size = 10 + Math.random() * 20;  // 10-30 px
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';
  bubble.style.left = (Math.random() * (bubblesContainer.clientWidth - size)) + 'px';
  bubble.style.bottom = '-20px';
  bubble.style.animationDuration = (3 + Math.random() * 2) + 's';
  bubblesContainer.appendChild(bubble);
  setTimeout(() => {
    bubble.remove();
  }, 5000);
}

// Interval buih
let bubbleInterval;

// Mulai bikin buih saat drag
function startBubbles() {
  if (bubbleInterval) return;
  bubbleInterval = setInterval(() => {
    for (let i=0; i<3; i++) createBubble();
  }, 350);
}

// Stop buih saat drag selesai
function stopBubbles() {
  clearInterval(bubbleInterval);
  bubbleInterval = null;
}

function pointerDown(e) {
  isDragging = true;
  startX = e.clientX || e.touches[0].clientX;
  startY = e.clientY || e.touches[0].clientY;
  card.style.transition = 'none';
  startBubbles();
}

function pointerMove(e) {
  if (!isDragging) return;
  e.preventDefault();
  let currentX = e.clientX || e.touches[0].clientX;
  let currentY = e.clientY || e.touches[0].clientY;
  let deltaX = currentX - startX;
  let deltaY = currentY - startY;
  currentRotationY += deltaX * 0.5;
  currentRotationX -= deltaY * 0.5;
  currentRotationX = Math.min(Math.max(currentRotationX, -70), 70);
  card.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
  startX = currentX;
  startY = currentY;
}

function pointerUp(e) {
  if (!isDragging) return;
  isDragging = false;
  card.style.transition = 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
  stopBubbles();
}

card.addEventListener('mousedown', pointerDown);
card.addEventListener('touchstart', pointerDown);

window.addEventListener('mousemove', pointerMove);
window.addEventListener('touchmove', pointerMove, { passive: false });

window.addEventListener('mouseup', pointerUp);
window.addEventListener('touchend', pointerUp);
window.addEventListener('touchcancel', pointerUp);
