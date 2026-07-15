import { Bot } from './bot.js';
import { Energy } from './energy.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const TARGET_FPS = 60;
const TIME_PER_FRAME_MS = 1000 / TARGET_FPS;
const TIME_PER_FRAME_S = 1 / TARGET_FPS;

let lastTime = 0;
let accumulatedTime = 0;

const bot = new Bot();
bot.teleport(canvas.width / 4, canvas.height / 2);

const energy = new Energy();
energy.teleport(canvas.width / 4 * 3, canvas.height / 2);

function update() {
    bot.update(TIME_PER_FRAME_S);
    energy.update(TIME_PER_FRAME_S);

    if (areColliding(bot, energy)) {
        bot.energy += energy.energy;
        energy.teleportToRandomPosition();
    }
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
