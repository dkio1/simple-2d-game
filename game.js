const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

// Player object
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    speed: 5,
    color: '#00ff00'
};

// Collectibles array
let collectibles = [];
let score = 0;

// Keyboard input
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Initialize collectibles
function initCollectibles() {
    collectibles = [];
    for (let i = 0; i < 10; i++) {
        collectibles.push({
            x: Math.random() * (canvas.width - 20),
            y: Math.random() * (canvas.height - 20),
            width: 15,
            height: 15,
            color: '#ffff00'
        });
    }
}

// Update player position
function updatePlayer() {
    if (keys['arrowup'] || keys['w']) {
        player.y = Math.max(0, player.y - player.speed);
    }
    if (keys['arrowdown'] || keys['s']) {
        player.y = Math.min(canvas.height - player.height, player.y + player.speed);
    }
    if (keys['arrowleft'] || keys['a']) {
        player.x = Math.max(0, player.x - player.speed);
    }
    if (keys['arrowright'] || keys['d']) {
        player.x = Math.min(canvas.width - player.width, player.x + player.speed);
    }
}

// Check collision with collectibles
function checkCollisions() {
    for (let i = collectibles.length - 1; i >= 0; i--) {
        const collectible = collectibles[i];
        if (
            player.x < collectible.x + collectible.width &&
            player.x + player.width > collectible.x &&
            player.y < collectible.y + collectible.height &&
            player.y + player.height > collectible.y
        ) {
            collectibles.splice(i, 1);
            score += 10;
            scoreDisplay.textContent = score;
            
            // Spawn new collectible
            collectibles.push({
                x: Math.random() * (canvas.width - 20),
                y: Math.random() * (canvas.height - 20),
                width: 15,
                height: 15,
                color: '#ffff00'
            });
        }
    }
}

// Draw functions
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

function drawCollectibles() {
    collectibles.forEach(collectible => {
        ctx.fillStyle = collectible.color;
        ctx.beginPath();
        ctx.arc(
            collectible.x + collectible.width / 2,
            collectible.y + collectible.height / 2,
            collectible.width / 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
}

// Main game loop
function gameLoop() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw
    updatePlayer();
    checkCollisions();
    drawPlayer();
    drawCollectibles();
    
    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Start game
initCollectibles();
gameLoop();