const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ===== ШЛЯХ ДО ФАЙЛІВ =====
const bookedFilePath = path.join(__dirname, 'bookedSeats.json');
const purchasePath = path.join(__dirname, 'purchases.json');

// ===== EMAIL ВАЛІДАЦІЯ =====
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ===== ЧИТАННЯ JSON =====
function readJSON(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]');
        }
        return JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        return [];
    }
}

// ===== ЗАПИС JSON =====
function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`Error writing to ${filePath}:`, err);
    }
}

// ===== ІНІЦІАЛІЗАЦІЯ =====
let bookedSeatsByShow;
try {
    bookedSeatsByShow = fs.existsSync(bookedFilePath) ?
        JSON.parse(fs.readFileSync(bookedFilePath)) :
        {};
} catch (err) {
    console.error('Failed to load booked seats:', err);
    bookedSeatsByShow = {};
}

function saveBookedSeats() {
    writeJSON(bookedFilePath, bookedSeatsByShow);
}

// ===== БРОНЮВАННЯ =====
app.post('/api/book', (req, res) => {
    const { seats, name, email, showId } = req.body;

    if (!seats || !name || !showId || !email) {
        return res.status(400).json({ message: 'Seats, name, email and showId are required' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!bookedSeatsByShow[showId]) {
        bookedSeatsByShow[showId] = [];
    }

    const allBooked = bookedSeatsByShow[showId].flatMap(entry => entry.seats);
    const alreadyBooked = seats.some(seat => allBooked.includes(seat));
    if (alreadyBooked) {
        return res.status(400).json({ message: 'Some of the selected seats are already booked' });
    }

    bookedSeatsByShow[showId].push({
        seats,
        user: { name, email },
        timestamp: new Date().toISOString()
    });

    saveBookedSeats();
    console.log(`Seats booked: ${seats.join(', ')} for ${name} (showId: ${showId})`);
    res.status(200).json({ message: 'Seats booked successfully' });
});

// ===== КУПІВЛЯ =====
app.post('/api/purchase', (req, res) => {
    const { seats, userData, showId } = req.body;

    if (!seats || !userData || !userData.name || !userData.email || !showId) {
        return res.status(400).json({ message: 'Incomplete purchase data' });
    }

    if (!emailRegex.test(userData.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!bookedSeatsByShow[showId]) {
        bookedSeatsByShow[showId] = [];
    }

    const allBooked = bookedSeatsByShow[showId].flatMap(entry => entry.seats);
    const alreadyBooked = seats.some(seat => allBooked.includes(seat));
    if (alreadyBooked) {
        return res.status(400).json({ message: 'Some seats already purchased' });
    }

    bookedSeatsByShow[showId].push({
        seats,
        user: { name: userData.name, email: userData.email },
        timestamp: new Date().toISOString()
    });

    saveBookedSeats();

    const purchases = readJSON(purchasePath);
    purchases.push({
        ...userData,
        showId,
        seats,
        timestamp: new Date().toISOString()
    });
    writeJSON(purchasePath, purchases);

    console.log(`Tickets purchased by ${userData.name} for seats: ${seats.join(', ')} (showId: ${showId})`);
    res.status(200).json({ message: 'Tickets purchased successfully' });
});

// ===== ЛИШЕ ЗАЙНЯТІ МІСЦЯ =====
app.get('/api/booked/:showId', (req, res) => {
    const { showId } = req.params;
    const bookings = bookedSeatsByShow[showId] || [];
    const seats = bookings.flatMap(entry => entry.seats);
    res.json({ bookedSeats: seats });
});

// ===== ВСІ БРОНЮВАННЯ З ІНФО =====
app.get('/api/bookings/:showId', (req, res) => {
    const { showId } = req.params;
    const bookings = bookedSeatsByShow[showId] || [];
    res.json({ bookings });
});

// ===== ПОШУК ЗА EMAIL =====
app.get('/api/bookings/search', (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const results = [];

    for (const showId in bookedSeatsByShow) {
        const bookings = bookedSeatsByShow[showId];
        bookings.forEach(entry => {
            if (entry.user.email === email) {
                results.push({
                    showId,
                    seats: entry.seats,
                    name: entry.user.name,
                    email: entry.user.email,
                    timestamp: entry.timestamp
                });
            }
        });
    }

    res.json({ bookings: results });
});

// ===== СКАСУВАННЯ =====
app.delete('/api/bookings/cancel', (req, res) => {
    const { showId, email, seats } = req.body;

    if (!showId || !email || !seats || !Array.isArray(seats)) {
        return res.status(400).json({ message: 'showId, email and seats are required' });
    }

    if (!bookedSeatsByShow[showId]) {
        return res.status(404).json({ message: 'No bookings for this showId' });
    }

    const originalLength = bookedSeatsByShow[showId].length;

    bookedSeatsByShow[showId] = bookedSeatsByShow[showId].filter(entry => {
        return !(
            entry.user.email === email &&
            JSON.stringify(entry.seats.sort()) === JSON.stringify(seats.sort())
        );
    });

    if (bookedSeatsByShow[showId].length === originalLength) {
        return res.status(404).json({ message: 'Booking not found for cancellation' });
    }

    saveBookedSeats();
    res.json({ message: 'Booking cancelled successfully' });
});

// ===== ЗАПУСК СЕРВЕРА =====
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});