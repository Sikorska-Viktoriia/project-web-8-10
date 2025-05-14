import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookingForm from './BookingForm'; // Компонент форми для бронювання
import BookingService from '../services/BookingService'; // Сервіс для взаємодії з сервером

const ROWS = 6;
const COLS = 12;
const VIP_ROWS = 2;
const TICKET_PRICE = 150;

const Seat = styled.circle`
  transition: transform 0.3s, fill 0.3s;
  cursor: pointer;
`;

const CircusHall = ({ showId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Завантажуємо місця для конкретного showId
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await BookingService.getBookedSeats(showId); // Отримуємо з сервера
        setBookedSeats(res);
      } catch (err) {
        console.error("Не вдалося завантажити зайняті місця", err);
      }
    };

    fetchBookedSeats(); // Оновити при завантаженні

    const interval = setInterval(fetchBookedSeats, 5000); // Оновлюємо кожні 5 секунд
    return () => clearInterval(interval); // Очищаємо інтервал при виході
  }, [showId]);

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // Не можна вибирати вже заброньовані місця
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const seatCount = selectedSeats.length;
  const totalPrice = seatCount * TICKET_PRICE;

  return (
    <div style={styles.container}>
      <h2>Циркова Арена — Показ: {showId}</h2>

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
              const isVIP = rowIndex < VIP_ROWS;

              let fill = '#fff';
              let stroke = '#ccc';

              if (isBooked) fill = '#aaa'; // Зайняте місце
              else if (isSelected) {
                fill = '#5bc0de'; // Обране місце
                stroke = '#f0ad4e';
              } else if (isVIP) fill = '#f0ad4e'; // VIP місце

              return (
                <Seat
                  key={seatId}
                  cx={x}
                  cy={y}
                  r="12"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="2"
                  onClick={() => toggleSeat(seatId)} // Перемикає вибір
                />
              );
            })}
          </g>
        ))}
      </svg>

      <p>Вибрано місць: {seatCount}</p>
      <p>Сума до оплати: {totalPrice} грн</p>

      <BookingForm selectedSeats={selectedSeats} showId={showId} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  svg: {
    margin: '20px 0',
  },
};

export default CircusHall;
