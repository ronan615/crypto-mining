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

const BILL_INTERVAL_MS = 10 * 60 * 1000; 

const shopItems = {
    cpu: [
        { id: 'cpu1', name: 'Intel Core i3-10100', hashRate: 10, powerConsumption: 65, cost: 120, type: 'CPU' },
        { id: 'cpu2', name: 'AMD Ryzen 5 3600', hashRate: 25, powerConsumption: 95, cost: 200, type: 'CPU' },
        { id: 'cpu3', name: 'Intel Core i7-10700K', hashRate: 40, powerConsumption: 125, cost: 350, type: 'CPU' },
        { id: 'cpu4', name: 'AMD Ryzen 7 5800X', hashRate: 60, powerConsumption: 105, cost: 400, type: 'CPU' },
        { id: 'cpu5', name: 'Intel Core i9-12900K', hashRate: 80, powerConsumption: 241, cost: 600, type: 'CPU' },
        { id: 'cpu6', name: 'AMD Ryzen 9 5950X', hashRate: 90, powerConsumption: 105, cost: 650, type: 'CPU' },
        { id: 'cpu7', name: 'Intel Core i5-13600K', hashRate: 70, powerConsumption: 181, cost: 320, type: 'CPU' },
        { id: 'cpu8', name: 'AMD Ryzen 9 7950X', hashRate: 110, powerConsumption: 170, cost: 700, type: 'CPU' },
        { id: 'cpu9', name: 'Intel Xeon E3-1270 V6', hashRate: 30, powerConsumption: 73, cost: 250, type: 'CPU' },
        { id: 'cpu10', name: 'AMD EPYC 7763', hashRate: 150, powerConsumption: 280, cost: 8000, type: 'CPU' },
        { id: 'cpu11', name: 'Intel Core i3-12100F', hashRate: 15, powerConsumption: 60, cost: 120, type: 'CPU' },
        { id: 'cpu12', name: 'Ryzen 5 5600X', hashRate: 60, powerConsumption: 180, cost: 450, type: 'CPU' },
        { id: 'cpu13', name: 'Core i5-13600K', hashRate: 150, powerConsumption: 280, cost: 980, type: 'CPU' },
        { id: 'cpu14', name: 'Ryzen 7 7800X3D', hashRate: 350, powerConsumption: 550, cost: 2800, type: 'CPU' },
        { id: 'cpu15', name: 'Core i9-14900K', hashRate: 400, powerConsumption: 650, cost: 3500, type: 'CPU' },
        { id: 'cpu16', name: 'Threadripper 3990X', hashRate: 700, powerConsumption: 1000, cost: 7000, type: 'CPU' },
        { id: 'cpu17', name: 'Intel Core i9-13900K', hashRate: 90, powerConsumption: 253, cost: 550, type: 'CPU' },
        { id: 'cpu18', name: 'AMD Ryzen Threadripper PRO 5995WX', hashRate: 180, powerConsumption: 280, cost: 6500, type: 'CPU' },
        { id: 'cpu19', name: 'Intel Xeon Platinum 8380', hashRate: 200, powerConsumption: 270, cost: 10000, type: 'CPU' },
        { id: 'cpu20', name: 'AMD EPYC 9654', hashRate: 250, powerConsumption: 360, cost: 12000, type: 'CPU' },
    ],
    gpu: [
        { id: 'gpu1', name: 'NVIDIA GeForce GTX 1660 Super', hashRate: 26, powerConsumption: 125, cost: 200, type: 'GPU' },
        { id: 'gpu2', name: 'AMD Radeon RX 580', hashRate: 28, powerConsumption: 185, cost: 180, type: 'GPU' },
        { id: 'gpu3', name: 'NVIDIA GeForce RTX 2060', hashRate: 30, powerConsumption: 160, cost: 250, type: 'GPU' },
        { id: 'gpu4', name: 'AMD Radeon RX 5700 XT', hashRate: 50, powerConsumption: 225, cost: 350, type: 'GPU' },
        { id: 'gpu5', name: 'NVIDIA GeForce RTX 3060', hashRate: 40, powerConsumption: 170, cost: 320, type: 'GPU' },
        { id: 'gpu6', name: 'AMD Radeon RX 6700 XT', hashRate: 48, powerConsumption: 230, cost: 400, type: 'GPU' },
        { id: 'gpu7', name: 'NVIDIA GeForce RTX 3070', hashRate: 58, powerConsumption: 220, cost: 500, type: 'GPU' },
        { id: 'gpu8', name: 'AMD Radeon RX 6800 XT', hashRate: 60, powerConsumption: 250, cost: 550, type: 'GPU' },
        { id: 'gpu9', name: 'NVIDIA GeForce RTX 3080', hashRate: 85, powerConsumption: 320, cost: 700, type: 'GPU' },
        { id: 'gpu10', name: 'AMD Radeon RX 6900 XT', hashRate: 70, powerConsumption: 300, cost: 800, type: 'GPU' },
        { id: 'gpu11', name: 'NVIDIA GeForce RTX 3090', hashRate: 100, powerConsumption: 350, cost: 1200, type: 'GPU' },
        { id: 'gpu12', name: 'NVIDIA GeForce RTX 4070', hashRate: 60, powerConsumption: 200, cost: 600, type: 'GPU' },
        { id: 'gpu13', name: 'AMD Radeon RX 7900 XTX', hashRate: 80, powerConsumption: 350, cost: 1000, type: 'GPU' },
        { id: 'gpu14', name: 'NVIDIA GeForce RTX 4080', hashRate: 90, powerConsumption: 300, cost: 1000, type: 'GPU' },
        { id: 'gpu15', name: 'NVIDIA GeForce RTX 4090', hashRate: 120, powerConsumption: 450, cost: 1600, type: 'GPU' },
        { id: 'gpu16', name: 'NVIDIA CMP 170HX', hashRate: 160, powerConsumption: 250, cost: 2500, type: 'GPU' },
        { id: 'gpu17', name: 'AMD Radeon Pro VII', hashRate: 90, powerConsumption: 300, cost: 900, type: 'GPU' },
        { id: 'gpu18', name: 'NVIDIA A100', hashRate: 300, powerConsumption: 400, cost: 10000, type: 'GPU' },
        { id: 'gpu19', name: 'AMD Instinct MI250X', hashRate: 400, powerConsumption: 500, cost: 15000, type: 'GPU' },
        { id: 'gpu20', name: 'NVIDIA H100', hashRate: 600, powerConsumption: 700, cost: 25000, type: 'GPU' },
    ],
    asic: [
        { id: 'asic1', name: 'Bitmain Antminer S9', hashRate: 13.5, powerConsumption: 1350, cost: 200, type: 'ASIC' },
        { id: 'asic2', name: 'Bitmain Antminer S19 Pro', hashRate: 110, powerConsumption: 3250, cost: 2500, type: 'ASIC' },
        { id: 'asic3', name: 'Bitmain Antminer L7 (9.5 Gh/s)', hashRate: 9.5, powerConsumption: 3420, cost: 6000, type: 'ASIC' },
        { id: 'asic4', name: 'MicroBT Whatsminer M30S++', hashRate: 112, powerConsumption: 3472, cost: 2800, type: 'ASIC' },
        { id: 'asic5', name: 'Canaan AvalonMiner A1246', hashRate: 90, powerConsumption: 3420, cost: 2000, type: 'ASIC' },
        { id: 'asic6', name: 'Bitmain Antminer T19', hashRate: 84, powerConsumption: 3150, cost: 750, type: 'ASIC' },
        { id: 'asic7', name: 'Canaan AvalonMiner 1166 Pro', hashRate: 78, powerConsumption: 3276, cost: 1500, type: 'ASIC' },
        { id: 'asic8', name: 'MicroBT Whatsminer M50', hashRate: 118, powerConsumption: 3348, cost: 1800, type: 'ASIC' },
        { id: 'asic9', name: 'Bitmain Antminer S21', hashRate: 200, powerConsumption: 3500, cost: 4500, type: 'ASIC' },
        { id: 'asic10', name: 'MicroBT Whatsminer M50S', hashRate: 126, powerConsumption: 3304, cost: 2200, type: 'ASIC' },
        { id: 'asic11', name: 'Canaan AvalonMiner A1346', hashRate: 110, powerConsumption: 3300, cost: 1200, type: 'ASIC' },
        { id: 'asic12', name: 'Goldshell KD-MAX', hashRate: 40, powerConsumption: 3350, cost: 3500, type: 'ASIC' },
        { id: 'asic13', name: 'Goldshell HS6 SE', hashRate: 10, powerConsumption: 3200, cost: 3000, type: 'ASIC' },
        { id: 'asic14', name: 'Innosilicon T2T', hashRate: 30, powerConsumption: 2200, cost: 250, type: 'ASIC' },
        { id: 'asic15', name: 'Innosilicon A11 Pro (1.5 Gh/s)', hashRate: 1.5, powerConsumption: 2350, cost: 7000, type: 'ASIC' },
        { id: 'asic16', name: 'Bitmain Antminer S17 Pro', hashRate: 53, powerConsumption: 2385, cost: 800, type: 'ASIC' },
        { id: 'asic17', name: 'Whatsminer M31S+', hashRate: 70, powerConsumption: 3220, cost: 1000, type: 'ASIC' },
        { id: 'asic18', name: 'Canaan AvalonMiner 1066 Pro', hashRate: 50, powerConsumption: 3300, cost: 700, type: 'ASIC' },
        { id: 'asic19', name: 'Bitmain Antminer Z11', hashRate: 135, powerConsumption: 1418, cost: 1500, type: 'ASIC' },
        { id: 'asic20', name: 'Innosilicon A6+ LTC Master', hashRate: 2.2, powerConsumption: 2100, cost: 1000, type: 'ASIC' },
        { id: 'asic21', name: 'Bitmain Antminer L3++', hashRate: 0.58, powerConsumption: 1050, cost: 150, type: 'ASIC' },
        { id: 'asic22', name: 'Whatsminer M32', hashRate: 62, powerConsumption: 3472, cost: 900, type: 'ASIC' },
        { id: 'asic23', name: 'Canaan AvalonMiner 1246', hashRate: 90, powerConsumption: 3420, cost: 2000, type: 'ASIC' },
        { id: 'asic24', name: 'Bitmain Antminer D7', hashRate: 1286, powerConsumption: 3148, cost: 8000, type: 'ASIC' },
        { id: 'asic25', name: 'Goldshell CK5', hashRate: 12, powerConsumption: 2400, cost: 4000, type: 'ASIC' },
    ],
    fan: [
        { id: 'fan1', name: 'Noctua NF-P12 redux-1700 PWM', cooling: 0.1, powerConsumption: 1.08, cost: 15, type: 'Fan' },
        { id: 'fan2', name: 'Corsair ML120 Pro', cooling: 0.25, powerConsumption: 0.29, cost: 25, type: 'Fan' },
        { id: 'fan3', name: 'Arctic P14 PWM PST', cooling: 0.5, powerConsumption: 2.4, cost: 12, type: 'Fan' },
        { id: 'fan4', name: 'be quiet! Silent Wings 3 140mm PWM', cooling: 1.0, powerConsumption: 1.92, cost: 22, type: 'Fan' },
        { id: 'fan5', name: 'Cooler Master SickleFlow 120 ARGB', cooling: 0.3, powerConsumption: 3.6, cost: 18, type: 'Fan' },
        { id: 'fan6', name: 'Noctua NF-A14 PWM', cooling: 0.4, powerConsumption: 1.56, cost: 20, type: 'Fan' },
        { id: 'fan7', name: 'Thermaltake Riing Quad 12 RGB', cooling: 0.6, powerConsumption: 4.8, cost: 35, type: 'Fan' },
        { id: 'fan8', name: 'NZXT AER RGB 2 140mm', cooling: 0.7, powerConsumption: 4.8, cost: 40, type: 'Fan' },
        { id: 'fan9', name: 'Lian Li UNI FAN SL120', cooling: 0.8, powerConsumption: 1.2, cost: 30, type: 'Fan' },
        { id: 'fan10', name: 'Deepcool MF120 GT', cooling: 0.9, powerConsumption: 3.36, cost: 28, type: 'Fan' },
        { id: 'fan11', name: 'Fractal Design Dynamic X2 GP-14', cooling: 0.35, powerConsumption: 1.32, cost: 16, type: 'Fan' },
        { id: 'fan12', name: 'Phanteks PH-F140SP_BK', cooling: 0.45, powerConsumption: 2.16, cost: 19, type: 'Fan' },
        { id: 'fan13', 'name': 'Corsair AF140 Quiet Edition', cooling: 0.2, powerConsumption: 1.2, cost: 20, type: 'Fan' },
        { id: 'fan14', 'name': 'Noctua NF-F12 PWM', cooling: 0.28, powerConsumption: 0.6, cost: 21, type: 'Fan' },
        { id: 'fan15', 'name': 'Arctic F12 PWM', cooling: 0.15, powerConsumption: 1.8, cost: 8, type: 'Fan' },
        { id: 'fan16', 'name': 'Cooler Master Hyper 212 EVO Fan', cooling: 0.22, powerConsumption: 2.2, cost: 10, type: 'Fan' },
        { id: 'fan17', 'name': 'Deepcool RF120M', cooling: 0.32, powerConsumption: 3.0, cost: 15, type: 'Fan' },
        { id: 'fan18', 'name': 'Thermaltake Toughfan 12', cooling: 0.55, powerConsumption: 2.88, cost: 25, type: 'Fan' },
        { id: 'fan19', 'name': 'Scythe Kaze Flex 120 PWM', cooling: 0.27, powerConsumption: 1.56, cost: 14, type: 'Fan' },
        { id: 'fan20', 'name': 'SilverStone AP140', cooling: 0.42, powerConsumption: 1.92, cost: 17, type: 'Fan' }
    ],
    psu: [
        { id: 'psu1', name: 'Corsair RM750e (750W)', capacity: 750, cost: 100, type: 'PSU' },
        { id: 'psu2', name: 'EVGA SuperNOVA 850 G6 (850W)', capacity: 850, cost: 120, type: 'PSU' },
        { id: 'psu3', name: 'Seasonic FOCUS Plus Gold 1000W', capacity: 1000, cost: 160, type: 'PSU' },
        { id: 'psu4', name: 'Corsair HX1200 (1200W)', capacity: 1200, cost: 250, type: 'PSU' },
        { id: 'psu5', name: 'Thermaltake Toughpower GF1 1500W', capacity: 1500, cost: 300, type: 'PSU' },
        { id: 'psu6', name: 'EVGA SuperNOVA 1600 P2 (1600W)', capacity: 1600, cost: 400, type: 'PSU' },
        { id: 'psu7', name: 'Corsair AX1600i (1600W)', capacity: 1600, cost: 500, type: 'PSU' },
        { id: 'psu8', name: 'Seasonic PRIME TX-1000 (1000W)', capacity: 1000, cost: 200, type: 'PSU' },
        { id: 'psu9', name: 'Cooler Master MWE Gold 750 V2 (750W)', capacity: 750, cost: 90, type: 'PSU' },
        { id: 'psu10', name: 'be quiet! Dark Power Pro 12 1500W', capacity: 1500, cost: 450, type: 'PSU' },
        { id: 'psu11', name: 'SilverStone SX1000-LPT (1000W SFX-L)', capacity: 1000, cost: 220, type: 'PSU' },
        { id: 'psu12', name: 'FSP Hydro PTM Pro 1200W', capacity: 1200, cost: 280, type: 'PSU' },
        { id: 'psu13', name: 'Antec High Current Pro HCP-1300 Platinum (1300W)', capacity: 1300, cost: 320, type: 'PSU' },
        { id: 'psu14', name: 'NZXT C850 (850W)', capacity: 850, cost: 110, type: 'PSU' },
        { id: 'psu15', name: 'XFX XTR 750W', capacity: 750, cost: 95, type: 'PSU' },
        { id: 'psu16', name: 'Super Flower Leadex III Gold 850W', capacity: 850, cost: 115, type: 'PSU' },
        { id: 'psu17', name: 'Gigabyte P750GM (750W)', capacity: 750, cost: 85, type: 'PSU' },
        { id: 'psu18', name: 'Asus ROG Thor 1200P (1200W)', capacity: 1200, cost: 350, type: 'PSU' },
        { id: 'psu19', name: 'BitFenix Whisper M 850W', capacity: 850, cost: 105, type: 'PSU' },
        { id: 'psu20', name: 'Cooler Master V1000 (1000W)', capacity: 1000, cost: 150, type: 'PSU' }
    ],
    rig: [
        { id: 'rig1', name: 'Open Air Mining Frame (6 GPU)', slots: 6, cost: 80, type: 'Rig' },
        { id: 'rig2', name: 'Server Rack 4U (8 GPU)', slots: 8, cost: 150, type: 'Rig' },
        { id: 'rig3', name: 'Mining Case (12 GPU)', slots: 12, cost: 250, type: 'Rig' },
        { id: 'rig4', name: 'Professional Mining Rack (18 GPU)', slots: 18, cost: 400, type: 'Rig' },
        { id: 'rig5', name: 'Data Center Mining Chassis (24 GPU)', slots: 24, cost: 600, type: 'Rig' },
        { id: 'rig6', name: 'Mining Farm Module (36 GPU)', slots: 36, cost: 1000, type: 'Rig' },
        { id: 'rig7', name: 'Industrial Mining Container (48 GPU)', slots: 48, cost: 1500, type: 'Rig' },
        { id: 'rig8', name: 'Custom Liquid Cooled Rig (8 GPU)', slots: 8, cost: 500, type: 'Rig' },
        { id: 'rig9', name: 'Portable Mining Case (4 GPU)', slots: 4, cost: 120, type: 'Rig' },
        { id: 'rig10', name: 'Modular Mining Frame (10 GPU)', slots: 10, cost: 200, type: 'Rig' },
        { id: 'rig11', name: 'Enterprise Mining Rig (24 GPU)', slots: 24, cost: 5000, type: 'Rig' },
        { id: 'rig12', name: 'Industrial Mining Farm (48 GPU)', slots: 48, cost: 12000, type: 'Rig' },
        { id: 'rig13', name: 'Modular Data Center (64 GPU)', slots: 64, cost: 20000, type: 'Rig' },
        { id: 'rig14', name: 'Quantum Compute Rack (80 GPU)', slots: 80, cost: 30000, type: 'Rig' },
        { id: 'rig15', name: 'HyperScale Mining Hub (100 GPU)', slots: 100, cost: 40000, type: 'Rig' },
        { id: 'rig16', name: 'Planetary Mining Complex (120 GPU)', slots: 120, cost: 50000, type: 'Rig' },
    ],
};

let gameData = {
    players: {},
    marketPrices: {
        bitcoin: 30000,
        ethereum: 2000,
        litecoin: 100,
        dogecoin: 0.15,
        ripple: 0.50,
        cardano: 0.40,
        solana: 150.00,
        polkadot: 7.00,
        chainlink: 15.00
    },
    leaderboard: [],
    achievements: [
        { id: 'first_mine', name: 'First Mine', description: 'Mine your first cryptocurrency.', unlocked: false },
        { id: 'hardware_collector', name: 'Hardware Collector', description: 'Own 5 pieces of hardware.', unlocked: false },
        { id: 'millionaire', name: 'Millionaire', description: 'Reach $1,000,000 USD in total assets.', unlocked: false },
    ],
    pools: [
        { id: 'pool_alpha', name: 'Alpha Mine Pool (PPLNS)', fee: 0.01, strategy: 'PPLNS', minPayout: 0.0001, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'bitcoin', baseReward: 0.01 },
        { id: 'pool_beta', name: 'Beta Hash Collective (PPS)', fee: 0.02, strategy: 'PPS', minPayout: 0.00005, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'ethereum', baseReward: 0.05 },
        { id: 'pool_gamma', name: 'Gamma Global Miners (PPLNS)', fee: 0.015, strategy: 'PPLNS', minPayout: 0.0002, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'litecoin', baseReward: 0.02 },
        { id: 'pool_delta', name: 'Delta Digital Diggers (PPS)', fee: 0.018, strategy: 'PPS', minPayout: 0.00008, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'dogecoin', baseReward: 100 },
        { id: 'pool_epsilon', name: 'Epsilon Exchange (PPLNS)', fee: 0.012, strategy: 'PPLNS', minPayout: 0.00015, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'ripple', baseReward: 50 },
        { id: 'pool_zeta', name: 'Zeta Zappers (PPS)', fee: 0.025, strategy: 'PPS', minPayout: 0.00006, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'cardano', baseReward: 10 },
        { id: 'pool_eta', name: 'Eta Elite Miners (PPLNS)', fee: 0.008, strategy: 'PPLNS', minPayout: 0.0003, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'solana', baseReward: 0.1 },
        { id: 'pool_theta', name: 'Theta Thrashers (PPS)', fee: 0.022, strategy: 'PPS', minPayout: 0.00007, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'polkadot', baseReward: 1 },
        { id: 'pool_iota', name: 'Iota Innovators (PPLNS)', fee: 0.013, strategy: 'PPLNS', minPayout: 0.00025, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'chainlink', baseReward: 0.5 },
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

            gameData = { ...gameData, ...loadedData };

            if (!gameData.achievements) {
                gameData.achievements = [
                    { id: 'first_mine', name: 'First Mine', description: 'Mine your first cryptocurrency.', unlocked: false },
                    { id: 'hardware_collector', name: 'Hardware Collector', description: 'Own 5 pieces of hardware.', unlocked: false },
                    { id: 'millionaire', name: 'Millionaire', description: 'Reach $1,000,000 USD in total assets.', unlocked: false },
                ];
            }

            if (!gameData.pools) {
                gameData.pools = [
                    { id: 'pool_alpha', name: 'Alpha Mine Pool (PPLNS)', fee: 0.01, strategy: 'PPLNS', minPayout: 0.0001, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'bitcoin', baseReward: 0.01 },
                    { id: 'pool_beta', name: 'Beta Hash Collective (PPS)', fee: 0.02, strategy: 'PPS', minPayout: 0.00005, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'ethereum', baseReward: 0.05 },
                    { id: 'pool_gamma', name: 'Gamma Global Miners (PPLNS)', fee: 0.015, strategy: 'PPLNS', minPayout: 0.0002, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'litecoin', baseReward: 0.02 },
                    { id: 'pool_delta', name: 'Delta Digital Diggers (PPS)', fee: 0.018, strategy: 'PPS', minPayout: 0.00008, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'dogecoin', baseReward: 100 },
                    { id: 'pool_epsilon', name: 'Epsilon Exchange (PPLNS)', fee: 0.012, strategy: 'PPLNS', minPayout: 0.00015, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'ripple', baseReward: 50 },
                    { id: 'pool_zeta', name: 'Zeta Zappers (PPS)', fee: 0.025, strategy: 'PPS', minPayout: 0.00006, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'cardano', baseReward: 10 },
                    { id: 'pool_eta', name: 'Eta Elite Miners (PPLNS)', fee: 0.008, strategy: 'PPLNS', minPayout: 0.0003, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'solana', baseReward: 0.1 },
                    { id: 'pool_theta', name: 'Theta Thrashers (PPS)', fee: 0.022, strategy: 'PPS', minPayout: 0.00007, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'polkadot', baseReward: 1 },
                    { id: 'pool_iota', name: 'Iota Innovators (PPLNS)', fee: 0.013, strategy: 'PPLNS', minPayout: 0.00025, lastPayoutTime: Date.now(), totalPoolShares: 0, targetCrypto: 'chainlink', baseReward: 0.5 },
                ];
            } else {
                gameData.pools.forEach(pool => {
                    if (pool.totalPoolShares === undefined) pool.totalPoolShares = 0;
                    if (pool.lastPayoutTime === undefined) pool.lastPayoutTime = Date.now();
                });
            }

            for (const playerId in gameData.players) {
                if (gameData.players.hasOwnProperty(playerId)) {
                    const player = gameData.players[playerId];
                    if (!player.logs) player.logs = [];
                    if (player.powerGridCapacity === undefined) player.powerGridCapacity = 5000;
                    if (player.baseElectricityRate === undefined) player.baseElectricityRate = 0.15;
                    if (player.blackoutDuration === undefined) player.blackoutDuration = 0;
                    if (player.currentPoolId === undefined) player.currentPoolId = null;
                    if (player.sharesContributed === undefined) player.sharesContributed = 0;
                    if (player.crypto.ripple === undefined) player.crypto.ripple = 0;
                    if (player.crypto.cardano === undefined) player.crypto.cardano = 0;
                    if (player.crypto.solana === undefined) player.crypto.solana = 0;
                    if (player.crypto.polkadot === undefined) player.crypto.polkadot = 0;
                    if (player.crypto.chainlink === undefined) player.crypto.chainlink = 0;
                    if (player.electricityBillAccumulated === undefined) player.electricityBillAccumulated = 0;
                    if (player.lastOnlineActivityTime === undefined) player.lastOnlineActivityTime = Date.now();
                    if (player.lastBillDeductionTime === undefined) player.lastBillDeductionTime = Date.now();


                    const categories = ['cpu', 'gpu', 'asic', 'fan', 'psu', 'rig'];
                    categories.forEach(category => {
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
        saveGameData();
    }
}

function saveGameData() {
    ensureDataDirectoryExists();
    const dataToSave = { ...gameData };
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
                dogecoin: 0,
                ripple: 0,
                cardano: 0,
                solana: 0,
                polkadot: 0,
                chainlink: 0
            },
            hashRate: 0,
            powerConsumption: 0,
            powerCapacity: 0,
            powerGridCapacity: 5000,
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
            electricityBillAccumulated: 0,
            lastOnlineActivityTime: Date.now(),
            lastBillDeductionTime: Date.now(),
            baseElectricityRate: 0.15,
            totalMinedCoins: 0,
            totalMiningTimeHours: 0,
            totalEnergyUsedKWh: 0,
            totalEarningsUsd: 0,
            totalHardwareInvestmentUsd: 0,
            totalElectricityCostUsd: 0,
            playTimeMinutes: 0,
            lastSaveDate: null,
            unlockedAchievements: [],
            logs: [],
            blackoutDuration: 0,
            currentPoolId: null,
            sharesContributed: 0
        };
        saveGameData();
    } else {
        const player = gameData.players[playerId];
        const now = Date.now();
        const timeOfflineMs = now - player.lastOnlineActivityTime;

        if (timeOfflineMs >= BILL_INTERVAL_MS) {
            const intervalsPassed = Math.floor(timeOfflineMs / BILL_INTERVAL_MS);
            let totalOfflineCost = 0;

            const assumedPowerConsumption = player.powerConsumption || 0;
            const assumedElectricityRate = player.baseElectricityRate;

            for (let i = 0; i < intervalsPassed; i++) {
                const costPerInterval = (assumedPowerConsumption / 1000) * (BILL_INTERVAL_MS / 3600000) * assumedElectricityRate;
                totalOfflineCost += costPerInterval;
            }

            player.usd -= totalOfflineCost;
            player.totalElectricityCostUsd += totalOfflineCost;
            player.logs.push({ timestamp: now, message: `Paid $${totalOfflineCost.toFixed(2)} USD for ${intervalsPassed} offline electricity bills.` });
            player.electricityBillAccumulated = 0; 
            player.lastBillDeductionTime = now; 
        }
        player.lastOnlineActivityTime = now; 
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
    if (player.blackoutDuration > 0) {
        player.blackoutDuration--;
        player.currentMiningTarget = null;
        if (player.blackoutDuration <= 0) {
            player.logs.push({ timestamp: Date.now(), message: "Power restored. You can resume mining." });
        }
        return;
    }

    if (player.powerCapacity === 0 && player.powerConsumption > 0) {
        player.currentMiningTarget = null;
        if (!player.logs.some(log => log.message.includes("Power outage! (PSU)"))) {
            player.logs.push({ timestamp: Date.now(), message: "Power outage! (PSU) Mining halted due to insufficient PSU capacity." });
        }
        return;
    }

    if (!player.currentMiningTarget && !player.currentPoolId || player.hashRate === 0) {
        return;
    }

    const now = Date.now();
    if (now - player.lastBillDeductionTime >= BILL_INTERVAL_MS) {
        player.usd -= player.electricityBillAccumulated;
        player.totalElectricityCostUsd += player.electricityBillAccumulated;
        player.logs.push({ timestamp: now, message: `Paid electricity bill of $${player.electricityBillAccumulated.toFixed(2)} USD.` });
        player.electricityBillAccumulated = 0;
        player.lastBillDeductionTime = now;
    }

    let effectiveHashRate = player.hashRate;
    let currentElectricityRate = player.baseElectricityRate;

    if (player.powerConsumption > player.powerGridCapacity) {
        const overloadRatio = player.powerConsumption / player.powerGridCapacity;
        effectiveHashRate *= (1 / overloadRatio);
        currentElectricityRate = player.baseElectricityRate * (1 + (overloadRatio - 1) * 0.5);

        if (!player.logs.some(log => log.message.includes("Power grid overloaded! (Grid)"))) {
            player.logs.push({ timestamp: Date.now(), message: "Power grid overloaded! (Grid) Mining efficiency reduced and electricity costs increased." });
        }

        if (overloadRatio > 1.5) {
            player.currentMiningTarget = null;
            player.blackoutDuration = 30;
            player.logs.push({ timestamp: Date.now(), message: "Severe power overload! Temporary blackout initiated. Mining halted." });
            return;
        }
    } else {
        player.logs = player.logs.filter(log => !log.message.includes("Power grid overloaded! (Grid)"));
    }

    if (player.powerConsumption > player.powerCapacity) {
        effectiveHashRate *= 0.5;
        if (!player.logs.some(log => log.message.includes("Power grid overloaded! (PSU)"))) {
            player.logs.push({ timestamp: Date.now(), message: "Power grid overloaded! (PSU) Mining efficiency reduced due to PSU limits." });
        }
    } else {
        player.logs = player.logs.filter(log => !log.message.includes("Power grid overloaded! (PSU)"));
    }

    if (player.currentPoolId) {
        player.sharesContributed += effectiveHashRate / 60;
        const pool = gameData.pools.find(p => p.id === player.currentPoolId);
        if (pool) {
            pool.totalPoolShares += effectiveHashRate / 60;
        }
    } else {
        const crypto = player.currentMiningTarget;
        const miningEfficiency = 0.0000001;
        const generatedCrypto = (effectiveHashRate * miningEfficiency) / 60;
        player.crypto[crypto] += generatedCrypto;
        player.totalMinedCoins += generatedCrypto;
    }

    player.miningProgress = (player.miningProgress + 1) % 100;

    const xpGained = effectiveHashRate * 0.001;
    player.xp += xpGained;
    if (player.xp >= player.xpToNextLevel) {
        player.level++;
        player.xp = player.xp - player.xpToNextLevel;
        player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5);
    }

    const powerConsumption_kWh_per_second = player.powerConsumption / 1000 / 3600;
    player.electricityBillAccumulated += powerConsumption_kWh_per_second * currentElectricityRate;
    player.totalEnergyUsedKWh += powerConsumption_kWh_per_second;

    player.totalMiningTimeHours += (1 / 3600);
}

async function updateMarketPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,dogecoin,ripple,cardano,solana,polkadot,chainlink&vs_currencies=usd');
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
        if (data.ripple && data.ripple.usd) {
            gameData.marketPrices.ripple = parseFloat(data.ripple.usd.toFixed(2));
        }
        if (data.cardano && data.cardano.usd) {
            gameData.marketPrices.cardano = parseFloat(data.cardano.usd.toFixed(2));
        }
        if (data.solana && data.solana.usd) {
            gameData.marketPrices.solana = parseFloat(data.solana.usd.toFixed(2));
        }
        if (data.polkadot && data.polkadot.usd) {
            gameData.marketPrices.polkadot = parseFloat(data.polkadot.usd.toFixed(2));
        }
        if (data.chainlink && data.chainlink.usd) {
            gameData.marketPrices.chainlink = parseFloat(data.chainlink.usd.toFixed(2));
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
    let currentEffectiveElectricityRate = player.baseElectricityRate;
    if (player.powerConsumption > player.powerGridCapacity) {
        const overloadRatio = player.powerConsumption / player.powerGridCapacity;
        currentEffectiveElectricityRate = player.baseElectricityRate * (1 + (overloadRatio - 1) * 0.5);
    }

    const ownedHardwareFormatted = {};
    const categories = ['cpu', 'gpu', 'asic', 'fan', 'psu', 'rig'];
    categories.forEach(category => {
        if (player.inventory[category]) {
            for (const itemId in player.inventory[category]) {
                const ownedItem = player.inventory[category][itemId];
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
            name: player.name,
            currentPoolId: player.currentPoolId,
            sharesContributed: player.sharesContributed
        },
        wallet: { usd: player.usd, ...player.crypto },
        miningRig: {
            totalHashRate: player.hashRate,
            totalPowerConsumption: player.powerConsumption,
            powerCapacity: player.powerCapacity,
            powerGridCapacity: player.powerGridCapacity,
            totalAsicHashRateTH: player.inventory.asic ? Object.values(player.inventory.asic).reduce((sum, item) => {
                const detail = shopItems.asic.find(si => si.id === item.id);
                return sum + (detail ? detail.hashRate * item.count : 0);
            }, 0) : 0,
            totalGpuHashRateMH: player.inventory.gpu ? Object.values(player.inventory.gpu).reduce((sum, item) => {
                const detail = shopItems.gpu.find(si => si.id === item.id);
                return sum + (detail ? detail.hashRate * item.count : 0);
            }, 0) : 0,
        },
        currentlyMiningCrypto: player.currentMiningTarget,
        miningProgressPercent: player.miningProgress,
        time: { hours: player.totalMiningTimeHours },
        electricityRate: currentEffectiveElectricityRate,
        baseElectricityRate: player.baseElectricityRate,
        lastElectricityBillAmount: player.electricityBillAccumulated,
        timeUntilNextBillPaymentSeconds: Math.max(0, (player.lastBillDeductionTime + BILL_INTERVAL_MS - Date.now()) / 1000),
        totalMinedCoins: player.totalMinedCoins,
        totalMiningTimeHours: player.totalMiningTimeHours,
        totalEnergyUsedKWh: player.totalEnergyUsedKwh,
        totalEarningsUsd: player.totalEarningsUsd,
        totalHardwareInvestmentUsd: player.totalHardwareInvestmentUsd,
        totalElectricityCostUsd: player.totalElectricityCostUsd,
        playTimeMinutes: player.playTimeMinutes,
        lastSaveDate: player.lastSaveDate,
        cryptoPrices: gameData.marketPrices,
        shopItems: shopItems,
        allPlayerNames: Object.keys(gameData.players).map(id => gameData.players[id].name),
        ownedHardware: ownedHardwareFormatted,
        logs: player.logs || [],
        unlockedAchievements: player.unlockedAchievements,
        blackoutDuration: player.blackoutDuration,
        pools: gameData.pools.map(pool => ({
            id: pool.id,
            name: pool.name,
            fee: pool.fee,
            strategy: pool.strategy,
            targetCrypto: pool.targetCrypto
        }))
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
        { symbol: 'dogecoin', name: 'Dogecoin', iconUrl: 'https://placehold.co/40x40/C2A633/FFFFFF?text=DOGE' },
        { symbol: 'ripple', name: 'Ripple', iconUrl: 'https://placehold.co/40x40/000000/FFFFFF?text=XRP' },
        { symbol: 'cardano', name: 'Cardano', iconUrl: 'https://placehold.co/40x40/0033AD/FFFFFF?text=ADA' },
        { symbol: 'solana', name: 'Solana', iconUrl: 'https://placehold.co/40x40/9945FF/FFFFFF?text=SOL' },
        { symbol: 'polkadot', name: 'Polkadot', iconUrl: 'https://placehold.co/40x40/E6007A/FFFFFF?text=DOT' },
        { symbol: 'chainlink', name: 'Chainlink', iconUrl: 'https://placehold.co/40x40/2A5ADA/FFFFFF?text=LINK' }
    ];
    res.json(cryptoDefinitions);
});

app.get('/hardware', (req, res) => {
    const formattedShopItems = [];
    for (const category in shopItems) {
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

app.get('/pools', (req, res) => {
    res.json(gameData.pools.map(pool => ({
        id: pool.id,
        name: pool.name,
        fee: pool.fee,
        strategy: pool.strategy,
        targetCrypto: pool.targetCrypto
    })));
});

app.post('/join_pool', (req, res) => {
    const { userId, poolId } = req.body;
    const player = gameData.players[userId];
    const pool = gameData.pools.find(p => p.id === poolId);

    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }
    if (!pool) {
        return res.status(404).json({ status: 'error', message: 'Mining pool not found.' });
    }
    if (player.currentPoolId) {
        return res.status(400).json({ status: 'error', message: `Already in pool: ${player.currentPoolId}. Please leave current pool first.` });
    }

    player.currentPoolId = poolId;
    player.currentMiningTarget = pool.targetCrypto;
    player.sharesContributed = 0;
    player.logs.push({ timestamp: Date.now(), message: `Joined mining pool: ${pool.name}. Now mining ${pool.targetCrypto.toUpperCase()}.` });
    saveGameData();
    res.json({ status: 'success', message: `Successfully joined ${pool.name}!` });
});

app.post('/leave_pool', (req, res) => {
    const { userId } = req.body;
    const player = gameData.players[userId];

    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }
    if (!player.currentPoolId) {
        return res.status(400).json({ status: 'error', message: 'Not currently in a mining pool.' });
    }

    const poolName = gameData.pools.find(p => p.id === player.currentPoolId)?.name || 'unknown pool';

    player.currentPoolId = null;
    player.currentMiningTarget = null;
    player.sharesContributed = 0;
    player.logs.push({ timestamp: Date.now(), message: `Left mining pool: ${poolName}.` });
    saveGameData();
    res.json({ status: 'success', message: `Successfully left ${poolName}.` });
});


app.post('/start_simulation', (req, res) => {
    const { userId, cryptoSymbol } = req.body;
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }
    if (player.currentPoolId) {
        return res.status(400).json({ status: 'error', message: 'Cannot solo mine while in a pool. Please leave the pool first.' });
    }
    if (!cryptoSymbol || !player.crypto.hasOwnProperty(cryptoSymbol)) {
        return res.status(400).json({ status: 'error', message: 'Invalid cryptocurrency selected.' });
    }
    if (player.currentMiningTarget) {
        return res.status(400).json({ status: 'error', message: 'Simulation already running.' });
    }

    player.currentMiningTarget = cryptoSymbol;
    player.logs.push({ timestamp: Date.now(), message: `Started solo mining ${cryptoSymbol.toUpperCase()}.` });
    saveGameData();
    res.json({ status: 'success', message: 'Simulation started.' });
});

app.post('/stop_simulation', (req, res) => {
    const { userId } = req.body;
    const player = gameData.players[userId];
    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }
    if (!player.currentMiningTarget && !player.currentPoolId) {
        return res.status(400).json({ status: 'error', message: 'Simulation not running.' });
    }

    if (player.currentPoolId) {
        player.logs.push({ timestamp: Date.now(), message: 'Stopped contributing to pool.' });
    } else {
        player.logs.push({ timestamp: Date.now(), message: 'Stopped solo mining.' });
    }
    player.currentMiningTarget = null;
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
    for (const category in shopItems) {
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
        const basicCpu = shopItems.cpu.find(c => c.id === 'cpu1');
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

app.post('/upgrade_power_grid', (req, res) => {
    const { userId, capacityIncrease } = req.body;
    const player = gameData.players[userId];

    if (!player) {
        return res.status(404).json({ status: 'error', message: 'Player not found.' });
    }
    if (capacityIncrease <= 0 || typeof capacityIncrease !== 'number') {
        return res.status(400).json({ status: 'error', message: 'Invalid capacity increase amount.' });
    }

    const costPerWatt = 0.5;
    const upgradeCost = capacityIncrease * costPerWatt;

    if (player.usd < upgradeCost) {
        return res.status(400).json({ status: 'error', message: `Not enough USD. Requires $${upgradeCost.toFixed(2)}.` });
    }

    player.usd -= upgradeCost;
    player.powerGridCapacity += capacityIncrease;
    player.logs.push({ timestamp: Date.now(), message: `Upgraded power grid by ${capacityIncrease}W for $${upgradeCost.toFixed(2)}. New capacity: ${player.powerGridCapacity}W.` });
    saveGameData();

    res.json({
        status: 'success',
        message: `Power grid upgraded by ${capacityIncrease}W! New capacity: ${player.powerGridCapacity}W.`,
        newPowerGridCapacity: player.powerGridCapacity,
        playerUsd: player.usd
    });
});

setInterval(() => {
    for (const playerId in gameData.players) {
        const player = gameData.players[playerId];
        if (player.currentMiningTarget || player.currentPoolId) {
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
    gameData.pools.forEach(pool => {
        const now = Date.now();
        const timeSinceLastPayout = (now - pool.lastPayoutTime) / 1000;
        const payoutInterval = 60;

        if (timeSinceLastPayout >= payoutInterval && pool.totalPoolShares > 0) {
            let totalReward = pool.baseReward;
            const feeAmount = totalReward * pool.fee;
            const rewardAfterFee = totalReward - feeAmount;

            const playersInPool = Object.values(gameData.players).filter(p => p.currentPoolId === pool.id);

            if (pool.strategy === 'PPLNS') {
                playersInPool.forEach(player => {
                    if (player.sharesContributed > 0) {
                        const playerShareRatio = player.sharesContributed / pool.totalPoolShares;
                        const playerPayout = rewardAfterFee * playerShareRatio;
                        if (playerPayout >= pool.minPayout) {
                            player.crypto[pool.targetCrypto] += playerPayout;
                            player.totalEarningsUsd += playerPayout * gameData.marketPrices[pool.targetCrypto];
                            player.logs.push({ timestamp: Date.now(), message: `Received ${playerPayout.toFixed(8)} ${pool.targetCrypto.toUpperCase()} from ${pool.name} (PPLNS payout).` });
                        } else {
                            player.logs.push({ timestamp: Date.now(), message: `Accumulated ${player.sharesContributed.toFixed(2)} shares in ${pool.name}, but payout was below minimum (${pool.minPayout.toFixed(8)} ${pool.targetCrypto.toUpperCase()}). Shares carried over.` });
                        }
                    }
                });
            } else if (pool.strategy === 'PPS') {
                const valuePerShare = rewardAfterFee / pool.totalPoolShares;
                playersInPool.forEach(player => {
                    if (player.sharesContributed > 0) {
                        const playerPayout = player.sharesContributed * valuePerShare;
                        if (playerPayout >= pool.minPayout) {
                            player.crypto[pool.targetCrypto] += playerPayout;
                            player.totalEarningsUsd += playerPayout * gameData.marketPrices[pool.targetCrypto];
                            player.logs.push({ timestamp: Date.now(), message: `Received ${playerPayout.toFixed(8)} ${pool.targetCrypto.toUpperCase()} from ${pool.name} (PPS payout).` });
                        } else {
                            player.logs.push({ timestamp: Date.now(), message: `Accumulated ${player.sharesContributed.toFixed(2)} shares in ${pool.name}, but payout was below minimum (${pool.minPayout.toFixed(8)} ${pool.targetCrypto.toUpperCase()}). Shares carried over.` });
                        }
                    }
                });
            }

            playersInPool.forEach(player => {
                player.sharesContributed = 0;
            });
            pool.totalPoolShares = 0;
            pool.lastPayoutTime = now;
        }
    });
}, 60 * 1000);


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
