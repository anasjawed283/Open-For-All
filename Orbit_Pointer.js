const blob = document.querySelector('.blob');
const attractionStrength = 0.005;
let blobPositionX = window.innerWidth / 2;
let blobPositionY = window.innerHeight / 2;


function randomizeBlob() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  blob.style.backgroundColor = color;
  
  let size = Math.floor(Math.random() * (150 - 10 + 1)) + 10; // random size between 100px to 30px
  blob.style.width = size + 'px';
  blob.style.height = size + 'px';
}

setInterval(randomizeBlob, 2500);
let cursorPositionX = 0;
let cursorPositionY = 0;
let velocityX = 0;
let velocityY = 0;
let accelerationX = 0;
let accelerationY = 0;

function updateBlob()
  const distanceX = cursorPositionX - blobPositionX;
  const distanceY = cursorPositionY - blobPositionY;
  const forceX = distanceX * attractionStrength;
  const forceY = distanceY * attractionStrength;
  accelerationX += forceX;
  accelerationY += forceY;
  velocityX += accelerationX;
  velocityY += accelerationY;
  blobPositionX += velocityX;
  blobPositionY += velocityY;
  blob.style.left = blobPositionX + 'px';
  blob.style.top = blobPositionY + 'px';
  accelerationX = 0;
  accelerationY = 0;
}
function updateCursor(event) {
  cursorPositionX = event.clientX;
  cursorPositionY = event.clientY;
}
function loop() {
  updateBlob();
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
window.addEventListener('mousemove', updateCursor);
