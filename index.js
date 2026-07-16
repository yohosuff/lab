import { Bar } from './bar.js';
import { Bot } from './bot.js';
import { CoolColors } from './colors.js';
import { Energy } from './energy.js';
import { Vector2 } from './vector2.js';

const audioCtx = new window.AudioContext();

function playSoundEffect() {
    const now = audioCtx.currentTime;
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(523.25, now);
    oscillator.frequency.setValueAtTime(783.99, now + 0.08);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.25);
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const TARGET_FPS = 60;
const TIME_PER_FRAME_MS = 1000 / TARGET_FPS;
const TIME_PER_FRAME_S = 1 / TARGET_FPS;

let lastTime = 0;
let accumulatedTime = 0;

const bot = new Bot();
bot.teleport(canvas.width / 2, canvas.height / 2);

const energy = new Energy();
energy.teleport(canvas.width / 2 + bot.radius + 50, canvas.height / 2);

const bar = new Bar(3, 3, 200, 10, CoolColors.LIME, CoolColors.LAVENDER);

const keysPressed = {
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
};

const mousePosition = new Vector2();

let mouseDown = false;

window.addEventListener('keydown', event => {
    if (event.code in keysPressed) {
        keysPressed[event.code] = true;
    }
});

window.addEventListener('keyup', event => {
    if (event.code in keysPressed) {
        keysPressed[event.code] = false;
    }
});

canvas.addEventListener('mousemove', event => {
    const rect = canvas.getBoundingClientRect();
    mousePosition.x = event.clientX - rect.left;
    mousePosition.y = event.clientY - rect.top;
});

window.addEventListener('mousedown', event => {
    mouseDown = true;
});

window.addEventListener('mouseup', event => {
    mouseDown = false;
});

function update() {
    let direction = new Vector2();

    if (keysPressed.KeyD) {
        direction.x = 1;
    } else if(keysPressed.KeyA) {
        direction.x = -1;
    }

    if (keysPressed.KeyS) {
        direction.y = 1;
    } else if (keysPressed.KeyW) {
        direction.y = -1;
    }

    if (mouseDown) {
        direction = bot.position.directionTo(mousePosition);
    }

    bot.acceleration = direction.normalize().multiply(bot.speed);

    bot.update(TIME_PER_FRAME_S);
    energy.update(TIME_PER_FRAME_S);

    if (areColliding(bot, energy)) {
        bot.energy = Math.min(bot.maxEnergy, bot.energy + energy.energy);
        energy.teleportToRandomPosition(canvas.width, canvas.height);
        playSoundEffect();
    }

    bar.value = bot.energy / bot.maxEnergy;
}

function areColliding(circle_one, circle_two) {
    const dx = circle_one.position.x - circle_two.position.x;
    const dy = circle_one.position.y - circle_two.position.y;
    const d2 = (dx * dx) + (dy * dy);
    const r = circle_one.radius + circle_two.radius;
    const r2 = r * r;
    return d2 < r2;
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bar.render(ctx);
    bot.render(ctx);
    energy.render(ctx);
}

function gameLoop(currentTime) {
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    if (deltaTime > 250) deltaTime = 250;

    accumulatedTime += deltaTime;

    while(accumulatedTime >= TIME_PER_FRAME_MS) {
        update();
        accumulatedTime -= TIME_PER_FRAME_MS;
    }

    render();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(currentTime => {
    lastTime = currentTime;
    requestAnimationFrame(gameLoop);
});
