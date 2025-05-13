import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { generatePDF } from './pdfGenerator'; // шлях до модуля


const ROWS = 6;
const COLS = 12;
const VIP_ROWS = 2;

const Seat = styled.circle`
  transition: transform 0.3s, fill 0.3s;
  cursor: pointer;
`;

const CircusHall = ({ showId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const seatPrice = (seatId) => {
    const row = Math.floor((seatId - 1) / COLS);
    return row < VIP_ROWS ? 300 : 150;
  };

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId) || reservedSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const total = selectedSeats.reduce((sum, id) => sum + seatPrice(id), 0);

  const handleAction = (type) => {
    if (!userName.trim() || !userPhone.trim() || !userEmail.trim()) {
      alert('Введіть ім’я, телефон та email для продовження');
      return;
    }

    const newStatus = type === 'buy' ? bookedSeats : reservedSeats;
    const updateFn = type === 'buy' ? setBookedSeats : setReservedSeats;
    const storageKey = type === 'buy' ? 'bookedSeats' : 'reservedSeats';

    const updatedSeats = [...new Set([...newStatus, ...selectedSeats])];
    updateFn(updatedSeats);
    localStorage.setItem(storageKey, JSON.stringify(updatedSeats));

    if (type === 'buy') {
      generatePDF({
        name: userName,
        phone: userPhone,
        email: userEmail,
        seats: selectedSeats,
        logoUrl: '/logo.png' // заміни на повний шлях, якщо треба
      });
    } else {
      alert('Місця заброньовано!');
    }
    

    setSelectedSeats([]);
  };

  // const generatePDF = (seats) => {
  //   if (!Array.isArray(seats) || seats.length === 0) {
  //     alert("Немає вибраних місць для створення квитка");
  //     return;
  //   }
  
  //   const doc = new jsPDF();
  
  //   doc.setFont('helvetica', 'normal'); // ⚠️ Не підтримує українські символи повністю
  //   doc.setFontSize(16);
  //   doc.text('Kвиток на циркову виставу', 20, 20);
  
  //   doc.setFontSize(12);
  //   doc.text(`Iм'я: ${userName}`, 20, 30);
  //   doc.text(`Телефон: ${userPhone}`, 20, 40);
  //   doc.text(`Email: ${userEmail}`, 20, 50);
  
  //   const seatList = seats.join(', ');
  //   const totalAmount = seats.reduce((sum, id) => sum + seatPrice(id), 0);
  //   doc.text(`Місця: ${seatList}`, 20, 60);
  //   doc.text(`Сума до сплати: ${totalAmount} грн`, 20, 70);
  
  //   doc.save('ticket.pdf');
  // };
  

  useEffect(() => {
    const booked = JSON.parse(localStorage.getItem('bookedSeats')) || [];
    const reserved = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    setBookedSeats(booked);
    setReservedSeats(reserved);
  }, []);

  return (
    <div style={styles.container}>
      <h2>Циркова Арена — Показ: {showId}</h2>

      <input
        type="text"
        placeholder="Ім’я"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={styles.input}
      />

      <input
        type="tel"
        placeholder="Телефон"
        value={userPhone}
        onChange={(e) => setUserPhone(e.target.value)}
        style={styles.input}
      />

      <input
        type="email"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        style={styles.input}
      />

      <svg viewBox="0 0 500 400" width="80%" height="80%" style={styles.svg}>
        <rect x="200" y="30" width="100" height="30" fill="#d9534f" stroke="#fff" strokeWidth="2" />
        <text x="225" y="50" fill="#fff" fontSize="14" fontWeight="bold">Сцена</text>

        {[...Array(ROWS)].map((_, rowIndex) => (
          <g key={rowIndex}>
            {[...Array(COLS)].map((_, colIndex) => {
              const seatId = rowIndex * COLS + colIndex + 1;
              const x = 50 + colIndex * 35;
              const y = 100 + rowIndex * 30;

              const isSelected = selectedSeats.includes(seatId);
              const isBooked = bookedSeats.includes(seatId);
              const isReserved = reservedSeats.includes(seatId);
              const isVIP = rowIndex < VIP_ROWS;

              let fill = '#fff';
              let stroke = '#ccc';

              if (isBooked) fill = '#aaa';
              else if (isReserved) fill = '#d9534f';
              else if (isSelected) {
                fill = '#5bc0de';
                stroke = '#f0ad4e';
              } else if (isVIP) fill = '#f0ad4e';

              return (
                <Seat
                  key={seatId}
                  cx={x}
                  cy={y}
                  r="12"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="2"
                  onClick={() => toggleSeat(seatId)}
                />
              );
            })}
          </g>
        ))}
      </svg>

      <p>Вибрано місць: {selectedSeats.length}</p>
      <p>Загальна сума: {total} грн</p>

      <div style={styles.buttonBox}>
        <button style={styles.button} onClick={() => handleAction('reserve')}>Забронювати</button>
        <button style={styles.button} onClick={() => handleAction('buy')}>Купити</button>
      </div>

      <div style={styles.colorExplanation}>
        <p><span style={styles.bookedColor}>●</span> — Заброньовано</p>
        <p><span style={styles.reservedColor}>●</span> — Зарезервовано</p>
        <p><span style={styles.vipColor}>●</span> — VIP</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    padding: '10px',
  },
  svg: {
    border: '2px solid #333',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
    marginBottom: '20px',
  },
  input: {
    margin: '5px',
    padding: '8px',
    width: '250px',
    fontSize: '14px',
  },
  buttonBox: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  colorExplanation: {
    marginTop: '20px',
    textAlign: 'center',
  },
  bookedColor: {
    color: '#aaa',
  },
  reservedColor: {
    color: '#d9534f',
  },
  vipColor: {
    color: '#f0ad4e',
  },
};

export default CircusHall;