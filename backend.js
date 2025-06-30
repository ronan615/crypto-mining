const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend.html'));
});

app.use(express.static(path.join(__dirname)));

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'gameData.json');

// shopItems are now defined as a separate constant and will not be saved to gameData.json
const shopItems = {
    cpu: [
        { id: 'cpu1', name: 'Basic CPU', hashRate: 10, powerConsumption: 50, cost: 100, type: 'CPU' },
        { id: 'cpu2', name: 'Gaming CPU', hashRate: 50, powerConsumption: 150, cost: 400, type: 'CPU' },
        { id: 'cpu3', name: 'High-End CPU', hashRate: 120, powerConsumption: 250, cost: 900, type: 'CPU' },
        { id: 'cpu4', name: 'Server CPU', hashRate: 300, powerConsumption: 500, cost: 2500, type: 'CPU' },
        { id: 'cpu5', name: 'Quantum Core', hashRate: 1000, powerConsumption: 800, cost: 8000, type: 'CPU' },
        { id: 'cpu6', name: 'Core i3-12100F', hashRate: 15, powerConsumption: 60, cost: 120, type: 'CPU' },
        { id: 'cpu7', name: 'Ryzen 5 5600X', hashRate: 60, powerConsumption: 180, cost: 450, type: 'CPU' },
        { id: 'cpu8', name: 'Core i5-13600K', hashRate: 150, powerConsumption: 280, cost: 980, type: 'CPU' },
        { id: 'cpu9', name: 'Ryzen 7 7800X3D', hashRate: 350, powerConsumption: 550, cost: 2800, type: 'CPU' },
        { id: 'cpu10', name: 'Core i9-14900K', hashRate: 400, powerConsumption: 650, cost: 3500, type: 'CPU' },
        { id: 'cpu11', name: 'Threadripper 3990X', hashRate: 700, powerConsumption: 1000, cost: 7000, type: 'CPU' },
        { id: 'cpu12', name: 'Quantum Core v2', hashRate: 1200, powerConsumption: 950, cost: 10000, type: 'CPU' },
        { id: 'cpu13', name: 'Neural Processor Alpha', hashRate: 1500, powerConsumption: 1100, cost: 13000, type: 'CPU' },
        { id: 'cpu14', name: 'ExaCompute Chip', hashRate: 2000, powerConsumption: 1300, cost: 18000, type: 'CPU' },
        { id: 'cpu15', name: 'Infinity Core 2000', hashRate: 2500, powerConsumption: 1500, cost: 25000, type: 'CPU' },
        { id: 'cpu16', name: 'Fusion X-Core', hashRate: 3000, powerConsumption: 1700, cost: 30000, type: 'CPU' },
        { id: 'cpu17', name: 'OmniProcessor 3000', hashRate: 3500, powerConsumption: 1900, cost: 35000, type: 'CPU' },
        { id: 'cpu18', name: 'TeraByte Compute Unit', hashRate: 4000, powerConsumption: 2100, cost: 40000, type: 'CPU' },
        { id: 'cpu19', name: 'UltraCore Z1', hashRate: 4500, powerConsumption: 2300, cost: 45000, type: 'CPU' },
        { id: 'cpu20', name: 'GigaLogic Pro', hashRate: 5000, powerConsumption: 2500, cost: 50000, type: 'CPU' },
        { id: 'cpu21', name: 'Apex AI Processor', hashRate: 5500, powerConsumption: 2700, cost: 55000, type: 'CPU' },
        { id: 'cpu22', name: 'Nexus Quantum Engine', hashRate: 6000, powerConsumption: 2900, cost: 60000, type: 'CPU' },
        { id: 'cpu23', name: 'Stellar Compute Array', hashRate: 7000, powerConsumption: 3200, cost: 70000, type: 'CPU' },
    ],
    gpu: [
        { id: 'gpu1', name: 'NVIDIA RTX 3060', hashRate: 40, powerConsumption: 170, cost: 350, type: 'GPU' },
        { id: 'gpu2', name: 'NVIDIA RTX 3080', hashRate: 85, powerConsumption: 320, cost: 700, type: 'GPU' },
        { id: 'gpu3', name: 'NVIDIA RTX 4070', hashRate: 60, powerConsumption: 200, cost: 600, type: 'GPU' },
        { id: 'gpu4', name: 'NVIDIA RTX 4090', hashRate: 120, powerConsumption: 450, cost: 1600, type: 'GPU' },
        { id: 'gpu5', name: 'AMD RX 6800 XT', hashRate: 60, powerConsumption: 250, cost: 500, type: 'GPU' },
        { id: 'gpu6', name: 'AMD RX 7900 XTX', hashRate: 80, powerConsumption: 350, cost: 1000, type: 'GPU' },
        { id: 'gpu7', name: 'NVIDIA GTX 1660 Super', hashRate: 25, powerConsumption: 125, cost: 200, type: 'GPU' },
        { id: 'gpu8', name: 'AMD RX 6600 XT', hashRate: 32, powerConsumption: 130, cost: 280, type: 'GPU' },
        { id: 'gpu9', name: 'NVIDIA RTX 3070', hashRate: 58, powerConsumption: 220, cost: 550, type: 'GPU' },
        { id: 'gpu10', name: 'AMD RX 6900 XT', hashRate: 70, powerConsumption: 300, cost: 800, type: 'GPU' },
        { id: 'gpu11', name: 'NVIDIA RTX 3090', hashRate: 100, powerConsumption: 350, cost: 1200, type: 'GPU' },
        { id: 'gpu12', name: 'NVIDIA RTX 4080', hashRate: 90, powerConsumption: 300, cost: 1000, type: 'GPU' },
        { id: 'gpu13', name: 'AMD Radeon VII', hashRate: 90, powerConsumption: 300, cost: 900, type: 'GPU' },
        { id: 'gpu14', name: 'NVIDIA CMP 170HX', hashRate: 160, powerConsumption: 250, cost: 2500, type: 'GPU' },
        { id: 'gpu15', name: 'Professional Mining Card 1', hashRate: 200, powerConsumption: 400, cost: 1800, type: 'GPU' },
        { id: 'gpu16', name: 'Quantum GPU Accelerator', hashRate: 300, powerConsumption: 500, cost: 3500, type: 'GPU' },
        { id: 'gpu17', name: 'OmniGPU X1', hashRate: 400, powerConsumption: 600, cost: 4500, type: 'GPU' },
        { id: 'gpu18', name: 'TeraForm GPU Array', hashRate: 500, powerConsumption: 700, cost: 5500, type: 'GPU' },
        { id: 'gpu19', name: 'CyberGPU 2077', hashRate: 600, powerConsumption: 800, cost: 6500, type: 'GPU' },
        { id: 'gpu20', name: 'MegaRender Chip', hashRate: 700, powerConsumption: 900, cost: 7500, type: 'GPU' },
        { id: 'gpu21', name: 'HyperThread 9000', hashRate: 800, powerConsumption: 1000, cost: 8500, type: 'GPU' },
        { id: 'gpu22', name: 'Elite Hash Engine', hashRate: 900, powerConsumption: 1100, cost: 9500, type: 'GPU' },
        { id: 'gpu23', name: 'Arcane Miner X', hashRate: 1000, powerConsumption: 1200, cost: 10500, type: 'GPU' },
        { id: 'gpu24', name: 'Stellar Miner Pro', hashRate: 1100, powerConsumption: 1300, cost: 11500, type: 'GPU' },
        { id: 'gpu25', name: 'Galaxy Hash Unit', hashRate: 1200, powerConsumption: 1400, cost: 12500, type: 'GPU' },
        { id: 'gpu26', name: 'Sentinel Compute', hashRate: 1300, powerConsumption: 1500, cost: 13500, type: 'GPU' },
        { id: 'gpu27', name: 'Zenith Mining Card', hashRate: 1400, powerConsumption: 1600, cost: 14500, type: 'GPU' },
        { id: 'gpu28', name: 'Apex Miner Max', hashRate: 1500, powerConsumption: 1700, cost: 15500, type: 'GPU' },
        { id: 'gpu29', name: 'Titan GPU Array', hashRate: 1600, powerConsumption: 1800, cost: 16500, type: 'GPU' },
        { id: 'gpu30', name: 'Orion Hash Processor', hashRate: 1700, powerConsumption: 1900, cost: 17500, type: 'GPU' },
        { id: 'gpu31', name: 'Voyager Mining Rig', hashRate: 1800, powerConsumption: 2000, cost: 18500, type: 'GPU' },
        { id: 'gpu32', name: 'Cosmic Crypto Engine', hashRate: 1900, powerConsumption: 2100, cost: 19500, type: 'GPU' },
    ],
    asic: [
        { id: 'asic1', name: 'Bitmain Antminer S9', hashRate: 13500, powerConsumption: 1350, cost: 200, type: 'ASIC' },
        { id: 'asic2', name: 'Bitmain Antminer S19 Pro', hashRate: 110000, powerConsumption: 3250, cost: 2500, type: 'ASIC' },
        { id: 'asic3', name: 'Bitmain Antminer L7', hashRate: 9500, powerConsumption: 3420, cost: 6000, type: 'ASIC' },
        { id: 'asic4', name: 'Whatsminer M30S++', hashRate: 112000, powerConsumption: 3472, cost: 2800, type: 'ASIC' },
        { id: 'asic5', name: 'AvalonMiner A1246', hashRate: 90000, powerConsumption: 3420, cost: 2000, type: 'ASIC' },
        { id: 'asic6', name: 'Canaan AvalonMiner 1166 Pro', hashRate: 78000, powerConsumption: 3276, cost: 1500, type: 'ASIC' },
        { id: 'asic7', name: 'Innosilicon A10 Pro+ ETH (750Mh/s)', hashRate: 75000, powerConsumption: 1350, cost: 4000, type: 'ASIC' },
        { id: 'asic8', name: 'Goldshell KD6', hashRate: 263000, powerConsumption: 2630, cost: 7000, type: 'ASIC' },
        { id: 'asic9', name: 'Bitmain Antminer S17+', hashRate: 73000, powerConsumption: 2920, cost: 1200, type: 'ASIC' },
        { id: 'asic10', name: 'MicroBT Whatsminer M21S', hashRate: 56000, powerConsumption: 3360, cost: 900, type: 'ASIC' },
        { id: 'asic11', name: 'Zeus Miner Thunder X3', hashRate: 150000, powerConsumption: 4000, cost: 4000, type: 'ASIC' },
        { id: 'asic12', name: 'Genesis Mining Pro', hashRate: 200000, powerConsumption: 5000, cost: 6000, type: 'ASIC' },
        { id: 'asic13', name: 'SuperHash Pro 200', hashRate: 250000, powerConsumption: 6000, cost: 8000, type: 'ASIC' },
        { id: 'asic14', name: 'Quantum Miner A1', hashRate: 300000, powerConsumption: 7000, cost: 10000, type: 'ASIC' },
        { id: 'asic15', name: 'TeraByte ASIC Engine', hashRate: 400000, powerConsumption: 8000, cost: 15000, type: 'ASIC' },
        { id: 'asic16', name: 'GigaHash Elite', hashRate: 500000, powerConsumption: 9000, cost: 20000, type: 'ASIC' },
        { id: 'asic17', name: 'Alpha Miner X5', hashRate: 600000, powerConsumption: 10000, cost: 25000, type: 'ASIC' },
        { id: 'asic18', name: 'Omega Miner Pro', hashRate: 700000, powerConsumption: 11000, cost: 30000, type: 'ASIC' },
        { id: 'asic19', name: 'Stellar Hash Array', hashRate: 800000, powerConsumption: 12000, cost: 35000, type: 'ASIC' },
        { id: 'asic20', name: 'Galactic Miner 1000', hashRate: 900000, powerConsumption: 13000, cost: 40000, type: 'ASIC' },
        { id: 'asic21', name: 'Celestial Compute', hashRate: 1000000, powerConsumption: 14000, cost: 50000, type: 'ASIC' },
        { id: 'asic22', name: 'Infinity Miner Pro', hashRate: 1100000, powerConsumption: 15000, cost: 60000, type: 'ASIC' },
        { id: 'asic23', name: 'Apex ASIC Max', hashRate: 1200000, powerConsumption: 16000, cost: 70000, type: 'ASIC' },
        { id: 'asic24', name: 'Titan Hash Engine', hashRate: 1300000, powerConsumption: 17000, cost: 80000, type: 'ASIC' },
        { id: 'asic25', name: 'Quantum TeraMiner', hashRate: 1400000, powerConsumption: 18000, cost: 90000, type: 'ASIC' },
        { id: 'asic26', name: 'SuperNode ASIC', hashRate: 1500000, powerConsumption: 19000, cost: 100000, type: 'ASIC' },
        { id: 'asic27', name: 'Ultimate Hash Machine', hashRate: 1600000, powerConsumption: 20000, cost: 110000, type: 'ASIC' },
        { id: 'asic28', name: 'Cybernetic Miner', hashRate: 1700000, powerConsumption: 21000, cost: 120000, type: 'ASIC' },
        { id: 'asic29', name: 'Fusion Hash Reactor', hashRate: 1800000, powerConsumption: 22000, cost: 130000, type: 'ASIC' },
        { id: 'asic30', name: 'Omega Pro ASIC', hashRate: 1900000, powerConsumption: 23000, cost: 140000, type: 'ASIC' },
        { id: 'asic31', name: 'Galactic Hash Forge', hashRate: 2000000, powerConsumption: 24000, cost: 150000, type: 'ASIC' },
    ],
    fan: [
        { id: 'fan1', name: 'Basic Fan', cooling: 0.1, powerConsumption: 10, cost: 50, type: 'Fan' },
        { id: 'fan2', name: 'Medium Fan', cooling: 0.25, powerConsumption: 25, cost: 150, type: 'Fan' },
        { id: 'fan3', name: 'Industrial Fan', cooling: 0.5, powerConsumption: 50, cost: 400, type: 'Fan' },
        { id: 'fan4', name: 'Liquid Cooler 100', cooling: 1.0, powerConsumption: 100, cost: 1000, type: 'Fan' },
        { id: 'fan5', name: 'Cryo-Chiller X', cooling: 2.5, powerConsumption: 250, cost: 3000, type: 'Fan' },
        { id: 'fan6', name: 'Advanced Cooling Fan', cooling: 0.7, powerConsumption: 70, cost: 600, type: 'Fan' },
        { id: 'fan7', name: 'Server Rack Fan', cooling: 0.9, powerConsumption: 90, cost: 800, type: 'Fan' },
        { id: 'fan8', name: 'HydroCooler Fan', cooling: 1.2, powerConsumption: 110, cost: 1200, type: 'Fan' },
        { id: 'fan9', name: 'Sub-Zero Cooler', cooling: 1.5, powerConsumption: 130, cost: 1500, type: 'Fan' },
        { id: 'fan10', name: 'Cryogenic Fan Array', cooling: 2.0, powerConsumption: 180, cost: 2500, type: 'Fan' },
        { id: 'fan11', name: 'Plasma Vortex Fan', cooling: 3.0, powerConsumption: 220, cost: 4000, type: 'Fan' },
        { id: 'fan12', name: 'Quantum Cooling Unit', cooling: 4.0, powerConsumption: 270, cost: 6000, type: 'Fan' },
        { id: 'fan13', name: 'Atmospheric Chiller', cooling: 5.0, powerConsumption: 320, cost: 8000, type: 'Fan' },
        { id: 'fan14', name: 'Ionic Breeze System', cooling: 6.0, powerConsumption: 370, cost: 10000, type: 'Fan' },
        { id: 'fan15', name: 'ThermoSiphon Pro', cooling: 7.0, powerConsumption: 420, cost: 12000, type: 'Fan' },
        { id: 'fan16', name: 'Stellar Cooling Matrix', cooling: 8.0, powerConsumption: 470, cost: 14000, type: 'Fan' },
        { id: 'fan17', name: 'Infinity Frost Unit', cooling: 9.0, powerConsumption: 520, cost: 16000, type: 'Fan' },
    ],
    psu: [
        { id: 'psu1', name: '500W PSU', capacity: 500, cost: 150, type: 'PSU' },
        { id: 'psu2', name: '750W PSU', capacity: 750, cost: 250, type: 'PSU' },
        { id: 'psu3', name: '1000W PSU', capacity: 1000, cost: 400, type: 'PSU' },
        { id: 'psu4', name: '1500W PSU', capacity: 1500, cost: 700, type: 'PSU' },
        { id: 'psu5', name: '2000W Enterprise PSU', capacity: 2000, cost: 1200, type: 'PSU' },
        { id: 'psu6', name: '2500W Platinum PSU', capacity: 2500, cost: 1800, type: 'PSU' },
        { id: 'psu7', name: '3000W Titanium PSU', capacity: 3000, cost: 2500, type: 'PSU' },
        { id: 'psu8', name: '4000W Industrial PSU', capacity: 4000, cost: 3500, type: 'PSU' },
        { id: 'psu9', name: '5000W Grid Power Unit', capacity: 5000, cost: 5000, type: 'PSU' },
        { id: 'psu10', name: '7500W Quantum Power', capacity: 7500, cost: 8000, type: 'PSU' },
        { id: 'psu11', name: '10000W Reactor PSU', capacity: 10000, cost: 12000, type: 'PSU' },
        { id: 'psu12', name: 'TeraWatt Power Source', capacity: 12000, cost: 15000, type: 'PSU' },
        { id: 'psu13', name: 'GigaVolt Power Station', capacity: 15000, cost: 18000, type: 'PSU' },
        { id: 'psu14', name: 'OmniPower 20000', capacity: 20000, cost: 22000, type: 'PSU' },
        { id: 'psu15', name: 'Stellar Energy Core', capacity: 25000, cost: 27000, type: 'PSU' },
        { id: 'psu16', name: 'Galactic Power Nexus', capacity: 30000, cost: 32000, type: 'PSU' },
        { id: 'psu17', name: 'Infinite Power Array', capacity: 35000, cost: 37000, type: 'PSU' },
    ],
    rig: [
        { id: 'rig1', name: 'Basic Rig', slots: 2, cost: 200, type: 'Rig' },
        { id: 'rig2', name: 'Medium Rig', slots: 4, cost: 500, type: 'Rig' },
        { id: 'rig3', name: 'Large Rig', slots: 8, cost: 1200, type: 'Rig' },
        { id: 'rig4', name: 'Server Rack', slots: 16, cost: 3000, type: 'Rig' },
        { id: 'rig5', name: 'Data Center Module', slots: 32, cost: 8000, type: 'Rig' },
        { id: 'rig6', name: 'Enterprise Mining Rig', slots: 24, cost: 5000, type: 'Rig' },
        { id: 'rig7', name: 'Industrial Mining Farm', slots: 48, cost: 12000, type: 'Rig' },
        { id: 'rig8', name: 'Modular Data Center', slots: 64, cost: 20000, type: 'Rig' },
        { id: 'rig9', name: 'Quantum Compute Rack', slots: 80, cost: 30000, type: 'Rig' },
        { id: 'rig10', name: 'HyperScale Mining Hub', slots: 100, cost: 40000, type: 'Rig' },
        { id: 'rig11', name: 'Planetary Mining Complex', slots: 120, cost: 50000, type: 'Rig' },
    ],
};

let gameData = {
    players: {},
    marketPrices: {
        bitcoin: 30000,
        ethereum: 2000,
        litecoin: 100,
        dogecoin: 0.15
    },
    leaderboard: [],
    achievements: [
        { id: 'first_mine', name: 'First Mine', description: 'Mine your first cryptocurrency.', unlocked: false },
        { id: 'hardware_collector', name: 'Hardware Collector', description: 'Own 5 pieces of hardware.', unlocked: false },
        { id: 'millionaire', name: 'Millionaire', description: 'Reach $1,000,000 USD in total assets.', unlocked: false },
    ]
};

function ensureDataDirectoryExists() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function loadGameData() {
    ensureDataDirectoryExists();
    if (fs.existsSync(DATA_FILE)) {
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            const loadedData = JSON.parse(data);

            // Merge loaded data with default gameData, ensuring shopItems is not overwritten
            gameData = { ...gameData, ...loadedData };

            // Ensure achievements are initialized if missing (for older save files)
            if (!gameData.achievements) {
                gameData.achievements = [
                    { id: 'first_mine', name: 'First Mine', description: 'Mine your first cryptocurrency.', unlocked: false },
                    { id: 'hardware_collector', name: 'Hardware Collector', description: 'Own 5 pieces of hardware.', unlocked: false },
                    { id: 'millionaire', name: 'Millionaire', description: 'Reach $1,000,000 USD in total assets.', unlocked: false },
                ];
            }

            for (const playerId in gameData.players) {
                if (gameData.players.hasOwnProperty(playerId)) {
                    const player = gameData.players[playerId];
                    if (!player.logs) {
                        player.logs = [];
                    }

                    const categories = ['cpu', 'gpu', 'asic', 'fan', 'psu', 'rig'];
                    categories.forEach(category => {
                        // Migration logic for old array-based inventory
                        if (Array.isArray(player.inventory[category])) {
                            const newInventoryCategory = {};
                            player.inventory[category].forEach(item => {
                                if (newInventoryCategory[item.id]) {
                                    newInventoryCategory[item.id].count++;
                                } else {
                                    newInventoryCategory[item.id] = { id: item.id, count: 1 };
                                }
                            });
                            player.inventory[category] = newInventoryCategory;
                        } else if (!player.inventory[category]) {
                            player.inventory[category] = {};
                        }
                    });
                }
            }

        } catch (error) {
            console.error('Error loading game data:', error);
        }
    } else {
        saveGameData(); // Create an initial empty file if it doesn't exist
    }
}

function saveGameData() {
    ensureDataDirectoryExists();
    // Exclude shopItems when saving gameData
    const dataToSave = { ...gameData };
    // No need to explicitly delete shopItems from dataToSave as it's no longer part of gameData
    fs.writeFile(DATA_FILE, JSON.stringify(dataToSave, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error saving game data:', err);
        }
    });
}

function initializePlayer(playerId) {
    if (!gameData.players[playerId]) {
        gameData.players[playerId] = {
            name: `Miner-${playerId.substring(0, 4)}`,
            usd: 10000,
            crypto: {
                bitcoin: 0,
                ethereum: 0,
                litecoin: 0,
                dogecoin: 0
            },
            hashRate: 0,
            powerConsumption: 0,
            powerCapacity: 0,
            currentMiningTarget: null,
            miningProgress: 0,
            inventory: {
                cpu: {},
                gpu: {},
                asic: {},
                fan: {},
                psu: {},
                rig: {},
            },
            level: 1,
            xp: 0,
            xpToNextLevel: 100,
            electricityBill: 0,
            lastBillPayment: Date.now(),
            electricityRate: 0.15,
            totalMinedCoins: 0,
            totalMiningTimeHours: 0,
            totalEnergyUsedKWh: 0,
            totalEarningsUsd: 0,
            totalHardwareInvestmentUsd: 0,
            totalElectricityCostUsd: 0,
            playTimeMinutes: 0,
            lastSaveDate: null,
            unlockedAchievements: [],
            logs: []
        };
        saveGameData();
    }
    return gameData.players[playerId];
}

function calculatePlayerStats(player) {
    let totalHashRate = 0;
    let totalPowerConsumption = 0;
    let totalPowerCapacity = 0;

    const categories = ['cpu', 'gpu', 'asic', 'fan', 'psu', 'rig'];
    categories.forEach(category => {
        if (player.inventory[category]) {
            for (const itemId in player.inventory[category]) {
                const ownedItem = player.inventory[category][itemId];
                // Access shopItems directly from the global constant
                const itemDetails = shopItems[category].find(shopItem => shopItem.id === ownedItem.id);
                if (itemDetails) {
                    totalHashRate += (itemDetails.hashRate || 0) * ownedItem.count;
                    totalPowerConsumption += (itemDetails.powerConsumption || 0) * ownedItem.count;
                    totalPowerCapacity += (itemDetails.capacity || 0) * ownedItem.count;
                }
            }
        }
    });

    player.hashRate = totalHashRate;
    player.powerConsumption = totalPowerConsumption;
    player.powerCapacity = totalPowerCapacity;
}

function simulateMining(player) {
    if (player.powerCapacity === 0 && player.powerConsumption > 0) {
        player.currentMiningTarget = null;
        if (!player.logs.some(log => log.message.includes("Power outage!"))) {
            player.logs.push({ timestamp: Date.now(), message: "Power outage! Mining halted due to insufficient power capacity." });
        }
        return;
    }

    if (!player.currentMiningTarget || player.hashRate === 0) {
        return;
    }

    const crypto = player.currentMiningTarget;
    const miningEfficiency = 0.0000001;

    let effectiveHashRate = player.hashRate;

    if (player.powerConsumption > player.powerCapacity) {
        effectiveHashRate *= 0.5;
        if (!player.logs.some(log => log.message.includes("Overloaded!"))) {
            player.logs.push({ timestamp: Date.now(), message: "Power grid overloaded! Mining efficiency reduced." });
        }
    }

    const generatedCrypto = (effectiveHashRate * miningEfficiency) / 60;
    player.crypto[crypto] += generatedCrypto;
    player.totalMinedCoins += generatedCrypto;

    player.miningProgress = (player.miningProgress + 1) % 100;

    const xpGained = effectiveHashRate * 0.001;
    player.xp += xpGained;
    if (player.xp >= player.xpToNextLevel) {
        player.level++;
        player.xp = player.xp - player.xpToNextLevel;
        player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5);
    }

    const powerConsumption_kWh_per_second = player.powerConsumption / 1000 / 3600;
    player.electricityBill += powerConsumption_kWh_per_second * player.electricityRate;
    player.totalElectricityCostUsd += powerConsumption_kWh_per_second * player.electricityRate;
    player.totalEnergyUsedKWh += powerConsumption_kWh_per_second;

    player.totalMiningTimeHours += (1 / 3600);
}

async function updateMarketPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,dogecoin&vs_currencies=usd');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.bitcoin && data.bitcoin.usd) {
            gameData.marketPrices.bitcoin = parseFloat(data.bitcoin.usd.toFixed(2));
        }
        if (data.ethereum && data.ethereum.usd) {
            gameData.marketPrices.ethereum = parseFloat(data.ethereum.usd.toFixed(2));
        }
        if (data.litecoin && data.litecoin.usd) {
            gameData.marketPrices.litecoin = parseFloat(data.litecoin.usd.toFixed(2));
        }
        if (data.dogecoin && data.dogecoin.usd) {
            gameData.marketPrices.dogecoin = parseFloat(data.dogecoin.usd.toFixed(2));
        }
    } catch (error) {
        console.error('Error fetching crypto prices from CoinGecko:', error);
        for (const crypto in gameData.marketPrices) {
            const volatility = Math.random() * 0.05 - 0.025;
            gameData.marketPrices[crypto] *= (1 + volatility);
            gameData.marketPrices[crypto] = parseFloat(gameData.marketPrices[crypto].toFixed(2));
        }
    }
}

function updateLeaderboard() {
    gameData.leaderboard = Object.entries(gameData.players)
        .map(([id, player]) => {
            let totalUSDValue = player.usd;
            for (const crypto in player.crypto) {
                totalUSDValue += player.crypto[crypto] * gameData.marketPrices[crypto];
            }
            return {
                id: id,
                name: player.name,
                usdBalance: parseFloat(totalUSDValue.toFixed(2))
            };
        })
        .sort((a, b) => b.usdBalance - a.usdBalance)
        .slice(0, 10);
}

function checkAchievements(player) {
    gameData.achievements.forEach(achievement => {
        if (!player.unlockedAchievements.includes(achievement.id)) {
            let unlocked = false;
            switch (achievement.id) {
                case 'first_mine':
                    if (player.totalMinedCoins > 0) {
                        unlocked = true;
                    }
                    break;
                case 'hardware_collector':
                    // Calculate total hardware owned based on the new inventory structure
                    const totalHardwareOwned = Object.values(player.inventory).reduce((sum, categoryItems) => {
                        return sum + Object.values(categoryItems).reduce((catSum, item) => catSum + item.count, 0);
                    }, 0);
                    if (totalHardwareOwned >= 5) {
                        unlocked = true;
                    }
                    break;
                case 'millionaire':
                    let totalUSDValue = player.usd;
                    for (const crypto in player.crypto) {
                        totalUSDValue += player.crypto[crypto] * gameData.marketPrices[crypto];
                    }
                    if (totalUSDValue >= 1000000) {
                        unlocked = true;
                    }
                    break;
            }

            if (unlocked) {
                player.unlockedAchievements.push(achievement.id);
                player.logs.push({ timestamp: Date.now(), message: `Achievement Unlocked: ${achievement.name}!` });
            }
        }
    });
}

app.get('/state', (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ status: 'error', message: 'User ID is required.' });
    }
    const player = initializePlayer(userId);

    const ownedHardwareFormatted = {};
    const categories = ['cpu', 'gpu', 'asic', 'fan', 'psu', 'rig'];
    categories.forEach(category => {
        if (player.inventory[category]) {
            for (const itemId in player.inventory[category]) {
                const ownedItem = player.inventory[category][itemId];
                // Access shopItems directly from the global constant
                const shopItemDetail = shopItems[category].find(si => si.id === ownedItem.id);
                if (shopItemDetail) {
                    ownedHardwareFormatted[ownedItem.id] = {
                        details: {
                            id: shopItemDetail.id,
                            name: shopItemDetail.name,
                            type: shopItemDetail.type,
                            hashRateMHs: shopItemDetail.type === 'GPU' ? shopItemDetail.hashRate : 0,
                            hashRateTHs: shopItemDetail.type === 'ASIC' ? shopItemDetail.hashRate : 0,
                            powerConsumptionWatts: shopItemDetail.powerConsumption,
                            coolingCapacityWatts: shopItemDetail.cooling,
                            powerCapacityWatts: shopItemDetail.capacity,
                            costUsd: shopItemDetail.cost
                        },
                        count: ownedItem.count
                    };
                }
            }
        }
    });


    res.json({
        status: 'success',
        player: {
            level: player.level,
            xp: player.xp,
            xpToNextLevel: player.xpToNextLevel,
            name: player.name
        },
        wallet: { usd: player.usd, ...player.crypto },
        miningRig: {
            totalHashRate: player.hashRate,
            totalPowerConsumption: player.powerConsumption,
            powerCapacity: player.powerCapacity,
            totalAsicHashRateTH: player.inventory.asic ? Object.values(player.inventory.asic).reduce((sum, item) => {
                const detail = shopItems.asic.find(si => si.id === item.id); // Use shopItems
                return sum + (detail ? detail.hashRate * item.count : 0);
            }, 0) : 0,
            totalGpuHashRateMH: player.inventory.gpu ? Object.values(player.inventory.gpu).reduce((sum, item) => {
                const detail = shopItems.gpu.find(si => si.id === item.id); // Use shopItems
                return sum + (detail ? detail.hashRate * item.count : 0);
            }, 0) : 0,
        },
        currentlyMiningCrypto: player.currentMiningTarget,
        miningProgressPercent: player.miningProgress,
        time: { hours: player.totalMiningTimeHours },
        electricityRate: player.electricityRate,
        lastElectricityBillAmount: player.electricityBill,
        electricityBillDueInHours: Math.max(0, 24 - ((Date.now() - player.lastBillPayment) / (1000 * 60 * 60)) % 24),
        totalMinedCoins: player.totalMinedCoins,
        totalMiningTimeHours: player.totalMiningTimeHours,
        totalEnergyUsedKWh: player.totalEnergyUsedKwh,
        totalEarningsUsd: player.totalEarningsUsd,
        totalHardwareInvestmentUsd: player.totalHardwareInvestmentUsd,
        totalElectricityCostUsd: player.totalElectricityCostUsd,
        playTimeMinutes: player.playTimeMinutes,
        lastSaveDate: player.lastSaveDate,
        cryptoPrices: gameData.marketPrices,
        shopItems: shopItems, // Pass the global shopItems constant
        allPlayerNames: Object.keys(gameData.players).map(id => gameData.players[id].name),
        ownedHardware: ownedHardwareFormatted,
        logs: player.logs || [],
        unlockedAchievements: player.unlockedAchievements
    });
});

app.get('/requestcurrentminingstate', (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ status: 'error', message: 'User ID is required.' });
    }
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }

    res.json({
        status: 'success',
        currentlyMiningCrypto: player.currentMiningTarget,
        miningProgressPercent: player.miningProgress,
        hashRate: player.hashRate,
        powerConsumption: player.powerConsumption
    });
});


app.get('/cryptocurrencies', (req, res) => {
    const cryptoDefinitions = [
        { symbol: 'bitcoin', name: 'Bitcoin', iconUrl: 'https://placehold.co/40x40/f7931a/FFFFFF?text=BTC' },
        { symbol: 'ethereum', name: 'Ethereum', iconUrl: 'https://placehold.co/40x40/627EEA/FFFFFF?text=ETH' },
        { symbol: 'litecoin', name: 'Litecoin', iconUrl: 'https://placehold.co/40x40/345D9D/FFFFFF?text=LTC' },
        { symbol: 'dogecoin', name: 'Dogecoin', iconUrl: 'https://placehold.co/40x40/C2A633/FFFFFF?text=DOGE' }
    ];
    res.json(cryptoDefinitions);
});

app.get('/hardware', (req, res) => {
    const formattedShopItems = [];
    for (const category in shopItems) { // Use the global shopItems constant
        shopItems[category].forEach(item => {
            formattedShopItems.push({
                id: item.id,
                name: item.name,
                hashRateMHs: item.type === 'GPU' ? item.hashRate : 0,
                hashRateTHs: item.type === 'ASIC' ? item.hashRate : 0,
                powerConsumptionWatts: item.powerConsumption || 0,
                coolingCapacityWatts: item.cooling || 0,
                powerCapacityWatts: item.capacity || 0,
                costUsd: item.cost,
                type: item.type.toLowerCase()
            });
        });
    }
    res.json(formattedShopItems);
});

app.get('/achievements', (req, res) => {
    const { userId } = req.query;
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }

    const playerAchievements = gameData.achievements.map(achievement => ({
        ...achievement,
        unlocked: player.unlockedAchievements.includes(achievement.id)
    }));
    res.json(playerAchievements);
});

app.get('/leaderboard', (req, res) => {
    updateLeaderboard();
    res.json(gameData.leaderboard);
});

app.post('/start_simulation', (req, res) => {
    const { userId, cryptoSymbol } = req.body;
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }
    if (!cryptoSymbol || !player.crypto.hasOwnProperty(cryptoSymbol)) {
        return res.status(400).json({ status: 'error', message: 'Invalid cryptocurrency selected.' });
    }
    if (player.currentMiningTarget) {
        return res.status(400).json({ status: 'error', message: 'Simulation already running.' });
    }

    player.currentMiningTarget = cryptoSymbol;
    player.logs.push({ timestamp: Date.now(), message: `Started mining ${cryptoSymbol.toUpperCase()}.` });
    saveGameData();
    res.json({ status: 'success', message: 'Simulation started.' });
});

app.post('/stop_simulation', (req, res) => {
    const { userId } = req.body;
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }
    if (!player.currentMiningTarget) {
        return res.status(400).json({ status: 'error', message: 'Simulation not running.' });
    }

    player.currentMiningTarget = null;
    player.logs.push({ timestamp: Date.now(), message: 'Stopped mining.' });
    saveGameData();
    res.json({ status: 'success', message: 'Simulation stopped.' });
});

app.post('/buy_hardware', (req, res) => {
    const { userId, hardwareId, quantity = 1 } = req.body;
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }

    let itemFound = null;
    let categoryFound = null;
    for (const category in shopItems) { // Use the global shopItems constant
        itemFound = shopItems[category].find(item => item.id === hardwareId);
        if (itemFound) {
            categoryFound = category;
            break;
        }
    }

    if (!itemFound) {
        return res.status(404).json({ status: 'error', message: 'Hardware item not found.' });
    }

    const totalCost = itemFound.cost * quantity;
    if (player.usd < totalCost) {
        return res.status(400).json({ status: 'error', message: 'Not enough USD to buy this item.' });
    }

    player.usd -= totalCost;
    player.totalHardwareInvestmentUsd += totalCost;

    if (!player.inventory[categoryFound]) {
        player.inventory[categoryFound] = {};
    }
    if (player.inventory[categoryFound][hardwareId]) {
        player.inventory[categoryFound][hardwareId].count += quantity;
    } else {
        player.inventory[categoryFound][hardwareId] = { id: hardwareId, count: quantity };
    }

    calculatePlayerStats(player);
    checkAchievements(player);
    player.logs.push({ timestamp: Date.now(), message: `Bought ${quantity} x ${itemFound.name} for $${totalCost.toFixed(2)}.` });
    saveGameData();

    const ownedHardwareFormatted = {};
    const categories = ['cpu', 'gpu', 'asic', 'fan', 'psu', 'rig'];
    categories.forEach(category => {
        if (player.inventory[category]) {
            for (const itemId in player.inventory[category]) {
                const ownedItem = player.inventory[category][itemId];
                // Access shopItems directly from the global constant
                const shopItemDetail = shopItems[category].find(si => si.id === ownedItem.id);
                if (shopItemDetail) {
                    ownedHardwareFormatted[ownedItem.id] = {
                        details: {
                            id: shopItemDetail.id,
                            name: shopItemDetail.name,
                            type: shopItemDetail.type,
                            hashRateMHs: shopItemDetail.type === 'GPU' ? shopItemDetail.hashRate : 0,
                            hashRateTHs: shopItemDetail.type === 'ASIC' ? shopItemDetail.hashRate : 0,
                            powerConsumptionWatts: shopItemDetail.powerConsumption,
                            coolingCapacityWatts: shopItemDetail.cooling,
                            powerCapacityWatts: shopItemDetail.capacity,
                            costUsd: shopItemDetail.cost
                        },
                        count: ownedItem.count
                    };
                }
            }
        }
    });

    res.json({ status: 'success', message: `Purchased ${quantity} x ${itemFound.name}!`, ownedHardware: ownedHardwareFormatted });
});

app.post('/sell_crypto', (req, res) => {
    const { userId, cryptoType, amount } = req.body;
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }

    if (!player.crypto.hasOwnProperty(cryptoType) || amount <= 0 || player.crypto[cryptoType] < amount) {
        return res.status(400).json({ status: 'error', message: 'Invalid crypto type or insufficient amount to sell.' });
    }

    const usdGained = amount * gameData.marketPrices[cryptoType];
    player.crypto[cryptoType] -= amount;
    player.usd += usdGained;
    player.totalEarningsUsd += usdGained;
    player.logs.push({ timestamp: Date.now(), message: `Sold ${amount.toFixed(4)} ${cryptoType.toUpperCase()} for $${usdGained.toFixed(2)}.` });
    saveGameData();
    res.json({ status: 'success', message: `Sold ${amount.toFixed(4)} ${cryptoType.toUpperCase()} for $${usdGained.toFixed(2)}!` });
});

app.post('/buy_crypto', (req, res) => {
    const { userId, cryptoType, amount } = req.body;
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }

    if (!player.crypto.hasOwnProperty(cryptoType) || amount <= 0) {
        return res.status(400).json({ status: 'error', message: 'Invalid crypto type or amount.' });
    }

    const totalCost = amount * gameData.marketPrices[cryptoType];
    if (player.usd < totalCost) {
        return res.status(400).json({ status: 'error', message: 'Not enough USD to buy this amount.' });
    }

    player.usd -= totalCost;
    player.crypto[cryptoType] += amount;
    player.logs.push({ timestamp: Date.now(), message: `Bought ${amount.toFixed(4)} ${cryptoType.toUpperCase()} for $${totalCost.toFixed(2)}.` });
    saveGameData();
    res.json({ status: 'success', message: `Bought ${amount.toFixed(4)} ${cryptoType.toUpperCase()} for $${totalCost.toFixed(2)}!` });
});

app.post('/redeem_code', (req, res) => {
    const { userId, code } = req.body;
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }

    if (code === 'FREECASH1000') {
        player.usd += 1000;
        player.logs.push({ timestamp: Date.now(), message: `Redeemed code "${code}". Gained $1000 USD!` });
        saveGameData();
        return res.json({ status: 'success', message: `Code "${code}" redeemed! Gained $1000 USD.` });
    } else if (code === 'SUPERMINER') {
        const basicCpu = shopItems.cpu.find(c => c.id === 'cpu1'); // Use the global shopItems constant
        if (basicCpu) {
            if (!player.inventory.cpu) {
                player.inventory.cpu = {};
            }
            if (player.inventory.cpu[basicCpu.id]) {
                player.inventory.cpu[basicCpu.id].count++;
            } else {
                player.inventory.cpu[basicCpu.id] = { id: basicCpu.id, count: 1 };
            }
            calculatePlayerStats(player);
            player.logs.push({ timestamp: Date.now(), message: `Redeemed code "${code}". Gained a Basic CPU!` });
            saveGameData();
            return res.json({ status: 'success', message: `Code "${code}" redeemed! Gained a Basic CPU.` });
        }
    }

    res.status(400).json({ status: 'error', message: 'Invalid or expired redemption code.' });
});

app.post('/update_name', (req, res) => {
    const { userId, name } = req.body;
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }

    const nameExists = Object.values(gameData.players).some(p => p.name === name && p.id !== userId);
    if (nameExists) {
        return res.status(400).json({ status: 'error', message: 'This name is already taken.' });
    }

    player.name = name;
    saveGameData();
    res.json({ status: 'success', message: 'Player name updated successfully.' });
});

app.post('/reset_data', (req, res) => {
    const { userId } = req.body;
    if (gameData.players[userId]) {
        delete gameData.players[userId];
        saveGameData();
        const newPlayer = initializePlayer(userId);
        res.json({ status: 'success', message: 'Game data reset successfully.', newPlayerState: newPlayer });
    } else {
        res.status(404).json({ status: 'error', message: 'Player data not found.' });
    }
});

setInterval(() => {
    for (const playerId in gameData.players) {
        const player = gameData.players[playerId];
        if (player.currentMiningTarget) {
            simulateMining(player);
        }
        calculatePlayerStats(player);
        checkAchievements(player);
        player.playTimeMinutes += (1 / 60);
    }
    updateLeaderboard();
}, 1000);

setInterval(() => {
    updateMarketPrices();
}, 30 * 1000);


setInterval(() => {
    for (const playerId in gameData.players) {
        gameData.players[playerId].lastSaveDate = Date.now();
    }
    saveGameData();
}, 60 * 1000);

loadGameData();

const PORT = process.env.PORT || 5003;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the game at http://localhost:${PORT}`);
});
