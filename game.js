const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  strength: 0,
  dexterity: 0,
  mana: 0,
  energy: 100,
  energyCap: 100,
  xp: 0,
  level: 1,
  trainingCost: 10,
  magicUnlocked: false
};

function drawText(text, x, y) {
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(text, x, y);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawText(`Strength: ${player.strength}`, 20, 30);
  drawText(`Dexterity: ${player.dexterity}`, 20, 60);
  drawText(`Mana: ${player.mana}`, 20, 90);
  drawText(`Energy: ${player.energy}/${player.energyCap}`, 20, 120);
  drawText(`XP: ${player.xp}`, 20, 150);
  drawText(`Level: ${player.level}`, 20, 180);
  drawText(`Magic Unlocked: ${player.magicUnlocked ? 'Yes' : 'No'}`, 20, 210);
}

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (e) => {
  const cost = player.trainingCost;

  if (e.key === "1" && player.energy >= cost) {
    player.strength++;
    player.xp += 10;
    player.energy -= cost;
  }

  if (e.key === "2" && player.level >= 10 && player.energy >= cost + 5) {
    player.strength += 3;
    player.dexterity += 1;
    player.xp += 15;
    player.energy -= (cost + 5);
  }

  if (e.key === "3" && player.level >= 30 && player.energy >= cost + 10) {
    player.strength += 5;
    player.dexterity += 2;
    player.xp += 25;
    player.energy -= (cost + 10);
  }

  if (e.key === "4" && player.level >= 100 && !player.magicUnlocked) {
    player.mana += 10;
    player.magicUnlocked = true;
  }

  while (player.xp >= 50 * player.level) {
    player.xp -= 50 * player.level;
    player.level++;
    player.energyCap += 20;
    player.trainingCost += 5;
  }
});

setInterval(() => {
  player.energy = Math.min(player.energy + player.level, player.energyCap);
}, 1000);

gameLoop();
