import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookingService from '../services/BookingService';

const ROWS = 6;
const COLS = 12;
const VIP_ROWS = 2;

const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center;
`;

const CircusHall = ({ showId, selectedSeats, setSelectedSeats }) => {
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await BookingService.getBookedSeats(showId);
        // Встановлюємо масив заброньованих місць
        setBookedSeats(res.bookedSeats || []);
      } catch (err) {
        console.error("Не вдалося завантажити зайняті місця", err);
      }
    };

    fetchBookedSeats();
    const interval = setInterval(fetchBookedSeats, 5000);

    return () => clearInterval(interval);
  }, [showId]);

  const toggleSeat = (seatId) => {
    // Якщо місце вже заброньоване — не дозволяємо вибрати
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const Seat = ({ cx, cy, r, fill, stroke, strokeWidth, onClick }) => (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      style={{ transition: 'transform 0.3s, fill 0.3s', cursor: 'pointer' }}
      onClick={onClick}
    />
  );

  return (
    <Container>
      <h2>Циркова Арена — Показ: {showId}</h2>

      <svg viewBox="0 0 500 400" width="80%" height="80%" style={{ margin: '20px 0' }}>
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

              if (isBooked) fill = '#aaa';
              else if (isSelected) {
                fill = '#5bc0de';
                stroke = '#f0ad4e';
              } else if (isVIP) fill = '#f0ad4e';

              return (
                <Seat
                  key={seatId}
                  cx={x}
                  cy={y}
                  r={12}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={2}
                  onClick={() => toggleSeat(seatId)}
                />
              );
            })}
          </g>
        ))}
      </svg>
    </Container>
  );
};

export default CircusHall;
