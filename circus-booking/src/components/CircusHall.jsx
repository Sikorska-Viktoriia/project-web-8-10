import React, { useEffect, useState } from 'react';
import BookingService from '../services/BookingService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Container,
  Title,
  ConfirmButton,
  Legend,
  LegendItemStyled
} from "./CircusHall.styled";


const ROWS = 6;
const COLS = 12;
const VIP_ROWS = 2;

const CircusHall = ({ showId, selectedSeats, setSelectedSeats }) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await BookingService.getBookedSeats(showId);
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
    if (bookedSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      toast.warning("Будь ласка, виберіть місця перед підтвердженням.");
      return;
    }
    toast.success(`Ви успішно обрали такі місця: ${selectedSeats.join(', ')}`);
  };

  const Seat = ({ cx, cy, r, fill, stroke, strokeWidth, onClick, seatId, isVIP }) => (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={{
          transition: 'transform 0.3s, fill 0.3s',
          cursor: onClick ? 'pointer' : 'default',
          filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.4))',
        }}
        onClick={onClick}
        onMouseEnter={() => setHoveredSeat({ seatId, price: isVIP ? 200 : 100 })}
        onMouseLeave={() => setHoveredSeat(null)}
      />
      <text
        x={cx}
        y={cy + 5}
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        textAnchor="middle"
        pointerEvents="none"
        style={{ userSelect: 'none', textShadow: '0 0 3px black' }}
      >
        {seatId}
      </text>
    </>
  );

  return (
    <Container>
      <Title>Циркова Арена — Показ: {showId}</Title>

      <svg viewBox="0 0 600 450" width="90%" height="90%" style={{ margin: '20px 0' }}>
        <defs>
          <radialGradient id="stageGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6f61" />
            <stop offset="100%" stopColor="#c1443e" />
          </radialGradient>
          <filter id="seatShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
          </filter>
          <radialGradient id="seatGradient" cx="50%" cy="50%" r="70%">
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2575fc" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        {/* Арена */}
        <path
          d="M 50 400 A 250 250 0 0 1 550 400 L 550 410 A 260 260 0 0 0 50 410 Z"
          fill="#1b2735"
          stroke="#a3b1c6"
          strokeWidth="2"
          filter="url(#seatShadow)"
        />

        {/* Сцена */}
        <path
          d="M 175 400 A 75 75 0 0 1 425 400 L 425 380 A 75 75 0 0 0 175 380 Z"
          fill="url(#stageGradient)"
          stroke="#fff"
          strokeWidth="4"
          filter="url(#seatShadow)"
        />
        <text
          x="300"
          y="395"
          fill="#fff"
          fontSize="20"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="Arial"
          style={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}
        >
          Сцена
        </text>

        {[...Array(ROWS)].map((_, rowIndex) => (
          <g key={rowIndex}>
            {[...Array(COLS)].map((_, colIndex) => {
              const seatId = rowIndex * COLS + colIndex + 1;
              const radius = 100 + rowIndex * 35;
              const angleStep = Math.PI / (COLS - 1);
              const angle = Math.PI - colIndex * angleStep;
              const x = 300 + radius * Math.cos(angle);
              const y = 370 - radius * Math.sin(angle);
              const isSelected = selectedSeats.includes(seatId);
              const isBooked = bookedSeats.includes(seatId);
              const isVIP = rowIndex < VIP_ROWS;

              let fill = 'url(#seatGradient)';
              let stroke = '#2575fc';

              if (isBooked) {
                fill = '#7f8c8d';
                stroke = '#566573';
              } else if (isSelected) {
                fill = '#f39c12';
                stroke = '#e67e22';
              } else if (isVIP) {
                fill = '#f1c40f';
                stroke = '#d4ac0d';
              }

              return (
                <Seat
                  key={seatId}
                  cx={x}
                  cy={y}
                  r={14}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={3}
                  onClick={() => toggleSeat(seatId)}
                  seatId={seatId}
                  isVIP={isVIP}
                />
              );
            })}
          </g>
        ))}

        {hoveredSeat && (
          <text
            x={300}
            y={30}
            fontSize="16"
            fontWeight="700"
            fill="#000"
            textAnchor="middle"
            style={{
              pointerEvents: 'none',
              background: '#fff',
              userSelect: 'none',
              filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.3))',
              borderRadius: '6px',
              padding: '6px',
            }}
          >
            Ціна місця {hoveredSeat.seatId}: {hoveredSeat.price} грн
          </text>
        )}
      </svg>

      <Legend>
  <LegendItemStyled className="booked">Заброньовані</LegendItemStyled>
  <LegendItemStyled className="available">Вільні</LegendItemStyled>
  <LegendItemStyled className="selected">Обрані</LegendItemStyled>
  <LegendItemStyled className="vip">VIP</LegendItemStyled>
</Legend>


      <ConfirmButton
        disabled={selectedSeats.length === 0}
        onClick={handleConfirm}
      >
        Підтвердити обрані місця
      </ConfirmButton>

      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
};

const LegendItem = ({ color, label }) => (
  <LegendItemStyled>
    <div style={{ backgroundColor: color }} />
    <span>{label}</span>
  </LegendItemStyled>
);

export default CircusHall;
