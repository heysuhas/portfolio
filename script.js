const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
    });
}

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.x += star.vx + (star.x - centerX) * 0.00001;
        star.y += star.vy + (star.y - centerY) * 0.00001;

        if (star.x < 0 || star.x > canvas.width) star.x = Math.random() * canvas.width;
        if (star.y < 0 || star.y > canvas.height) star.y = Math.random() * canvas.height;
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Create custom cursor
const customCursor = document.createElement('div');
customCursor.classList.add('custom-cursor');
document.body.appendChild(customCursor);

// Update custom cursor position
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
    customCursor.style.opacity = '1'; // Ensure cursor is visible when moving
});

const starCanvas = document.getElementById('starCanvas');
starCanvas.addEventListener('mouseenter', () => {
    customCursor.style.opacity = '0';
});
starCanvas.addEventListener('mouseleave', () => {
    customCursor.style.opacity = '1';
});

const interactiveElements = document.querySelectorAll('.social-link, .download-button');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        customCursor.style.display = 'none'; // Hide custom cursor
    });
    element.addEventListener('mouseleave', () => {
        customCursor.style.display = 'block'; // Show custom cursor
    });
});

function randomizeLetters(element, targetText, duration = 1500, onComplete) {
    const targetArray = targetText.split('');
    const maxLength = targetArray.length;
    let currentText = Array(maxLength).fill('');
    let startTime = null;

    function randomize(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        if (elapsed < duration) {
            for (let i = 0; i < maxLength; i++) {
                if (currentText[i] !== targetArray[i]) {
                    currentText[i] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter
                }
            }
            element.style.color = 'grey'; // Set color to grey during randomization
            element.innerHTML = currentText.join('');
            setTimeout(() => requestAnimationFrame(randomize), 100); // Slow down the randomization
        } else {
            element.innerHTML = targetText;
            element.style.color = ''; // Reset color to default
            onComplete();
        }
    }
    requestAnimationFrame(randomize);
}

function startRandomizingAnimation(element, texts, delay = 100, index = 0) {
    randomizeLetters(element, texts[index], 1500, () => { // 1.5 seconds duration
        setTimeout(() => {
            index = (index + 1) % texts.length; // Move to the next text
            startRandomizingAnimation(element, texts, delay, index);
        }, 1000); // Wait before starting the next animation
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const animatedNameElement = document.getElementById('animatedName');
    startRandomizingAnimation(animatedNameElement, ['Suhas', 'ZeN']);
});
