const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ===== ШЛЯХ ДО ФАЙЛУ ЗАБРОНЬОВАНИХ МІСЦЬ =====
const bookedFilePath = path.join(__dirname, 'bookedSeats.json');

// ===== ЗЧИТУЄМО ІСНУЮЧІ ДАНІ =====
let bookedSeatsByShow = fs.existsSync(bookedFilePath) ?
    JSON.parse(fs.readFileSync(bookedFilePath)) :
    {};

// ===== ФУНКЦІЯ ЗБЕРЕЖЕННЯ ДО ФАЙЛУ =====
function saveBookedSeats() {
    fs.writeFileSync(bookedFilePath, JSON.stringify(bookedSeatsByShow, null, 2));
}

// ===== БРОНЮВАННЯ =====
app.post('/api/book', (req, res) => {
    const { seats, name, showId } = req.body;

    if (!seats || !name || !showId) {
        return res.status(400).json({ message: 'Seats, name and showId are required' });
    }

    if (!bookedSeatsByShow[showId]) {
        bookedSeatsByShow[showId] = [];
    }

    const alreadyBooked = seats.some(seat => bookedSeatsByShow[showId].includes(seat));
    if (alreadyBooked) {
        return res.status(400).json({ message: 'Some of the selected seats are already booked' });
    }

    bookedSeatsByShow[showId] = bookedSeatsByShow[showId].concat(seats);
    saveBookedSeats();

    console.log(`Seats booked: ${seats.join(', ')} for ${name} (showId: ${showId})`);
    res.status(200).json({ message: 'Seats booked successfully' });
});

// ===== КУПІВЛЯ КВИТКІВ =====
app.post('/api/purchase', (req, res) => {
    const { seats, userData, showId } = req.body;

    if (!seats || !userData || !userData.name || !showId) {
        return res.status(400).json({ message: 'Incomplete purchase data' });
    }

    if (!bookedSeatsByShow[showId]) {
        bookedSeatsByShow[showId] = [];
    }

    const alreadyBooked = seats.some(seat => bookedSeatsByShow[showId].includes(seat));
    if (alreadyBooked) {
        return res.status(400).json({ message: 'Some seats already purchased' });
    }

    bookedSeatsByShow[showId] = bookedSeatsByShow[showId].concat(seats);
    saveBookedSeats();

    const purchaseRecord = {
        ...userData,
        showId,
        seats,
        timestamp: new Date().toISOString(),
    };

    const purchasePath = path.join(__dirname, 'purchases.json');
    const purchases = fs.existsSync(purchasePath) ?
        JSON.parse(fs.readFileSync(purchasePath)) :
        [];

    purchases.push(purchaseRecord);
    fs.writeFileSync(purchasePath, JSON.stringify(purchases, null, 2));

    console.log(`Tickets purchased by ${userData.name} for seats: ${seats.join(', ')} (showId: ${showId})`);
    res.status(200).json({ message: 'Tickets purchased successfully' });
});

// ===== ОТРИМАТИ ЗАЙНЯТІ МІСЦЯ ДЛЯ ВИСТАВИ =====
app.get('/api/booked/:showId', (req, res) => {
    const { showId } = req.params;
    const seats = bookedSeatsByShow[showId] || [];
    res.json({ bookedSeats: seats });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});