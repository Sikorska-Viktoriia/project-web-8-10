import React, { useState, useEffect } from 'react';
import BookingService from '../services/BookingService';
import styled from 'styled-components';

const SeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const Seat = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ booked, selected }) =>
    booked ? '#f44336' : selected ? '#2196f3' : '#4caf50'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;

const ArenaLayout = ({ showId, selectedSeats, setSelectedSeats }) => {
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    // Завантаження даних про заброньовані місця
    BookingService.getBookedSeats(showId).then(response => {
      setBookedSeats(response.data.flatMap(b => b.seats));
    });
  }, [showId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return; // Місце вже заброньоване
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat)); // Скасувати вибір
    } else {
      setSelectedSeats([...selectedSeats, seat]); // Додати до вибраних
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 30; i++) {
      const status = bookedSeats.includes(i)
        ? 'booked'
        : selectedSeats.includes(i)
        ? 'selected'
        : 'available';

      seats.push(
        <Seat
          key={i}
          booked={status === 'booked'}
          selected={status === 'selected'}
          onClick={() => toggleSeat(i)}
        >
          {i}
        </Seat>
      );
    }
    return seats;
  };

  return <SeatGrid>{renderSeats()}</SeatGrid>;
};

export default ArenaLayout;
