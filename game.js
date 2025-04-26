let muscleMass = 0;
let strength = 0;
let rebirthCount = 0;
let prestigeCount = 0;
let magicUnlocked = false;
let massPerSecond = 0.1; // Starting muscle mass gain per second
let rebirthThreshold = 1000; // Muscle mass required for rebirth
let prestigeThreshold = 10; // Rebirths required for prestige

// Update stats UI
function updateStats() {
    document.getElementById("muscleMass").textContent = muscleMass.toFixed(2);
    document.getElementById("strength").textContent = Math.sqrt(muscleMass).toFixed(2);
    document.getElementById("rebirthCount").textContent = rebirthCount;
    document.getElementById("prestigeCount").textContent = prestigeCount;
    document.getElementById("magicStatus").textContent = magicUnlocked ? "Yes" : "No";
}

// Increase muscle mass over time
function gainMuscleMass() {
    muscleMass += massPerSecond;
    updateStats();
}

// Rebirth function
function rebirth() {
    if (muscleMass >= rebirthThreshold) {
        muscleMass = 0;
        rebirthCount++;
        massPerSecond *= 1.5; // Increase mass gain rate
        updateStats();
    } else {
        alert("Not enough muscle mass to rebirth!");
    }
}

// Prestige function
function prestige() {
    if (rebirthCount >= prestigeThreshold) {
        prestigeCount++;
        massPerSecond *= 2; // Double mass gain rate on prestige
        updateStats();
    } else {
        alert("Not enough rebirths to prestige!");
    }
}

// Unlock magic after certain rebirths
function unlockMagic() {
    if (rebirthCount >= 50) { // Example threshold for unlocking magic
        magicUnlocked = true;
        updateStats();
    }
}

// Switch between tabs
function switchTab(tab) {
    const tabs = ["massTab", "statsTab", "settingsTab"];
    tabs.forEach(t => document.getElementById(t).style.display = "none");
    document.getElementById(tab).style.display = "block";
}

// Event Listeners
document.getElementById("rebirthBtn").addEventListener("click", rebirth);
document.getElementById("prestigeBtn").addEventListener("click", prestige);
document.getElementById("massTabBtn").addEventListener("click", () => switchTab("massTab"));
document.getElementById("statsTabBtn").addEventListener("click", () => switchTab("statsTab"));
document.getElementById("settingsTabBtn").addEventListener("click", () => switchTab("settingsTab"));

// Start gaining muscle mass automatically
setInterval(gainMuscleMass, 1000); // Gain muscle mass every second

updateStats();
