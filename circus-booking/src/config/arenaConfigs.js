// src/config/arenaConfigs.js

const arenaConfigs = {
    "Цирк на льоду": {
        rows: 5,
        seatsPerRow: 10,
        unavailableSeats: [1, 2, 3, 5], // місця, які вже заброньовані
    },
    "Цирк з тваринами": {
        rows: 6,
        seatsPerRow: 8,
        unavailableSeats: [8, 9, 10],
    },
};

export default arenaConfigs;