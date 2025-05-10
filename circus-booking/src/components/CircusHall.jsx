import React, { useState } from "react";
import styled from "styled-components";

const HallContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const SeatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 40px);
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Seat = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => (props.selected ? "#28a745" : props.booked ? "#ccc" : "#007bff")};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: ${(props) => (props.booked ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) =>
      props.booked ? "#ccc" : props.selected ? "#218838" : "#0056b3"};
  }
`;

const CircusHall = ({ showId }) => {
  const totalSeats = 60;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([3, 7, 15]); // Приклад вже заброньованих

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
   
      );
    };
    
    return (
    <HallContainer>
    <h3>Виберіть місця</h3>
    <SeatsGrid>
    {Array.from({ length: totalSeats }).map((_, index) => {
    const seatNumber = index + 1;
    const isBooked = bookedSeats.includes(seatNumber);
    const isSelected = selectedSeats.includes(seatNumber);
    return (
    <Seat
    key={seatNumber}
    booked={isBooked}
    selected={isSelected}
    onClick={() => !isBooked && handleSeatClick(seatNumber)}
    >
    {seatNumber}
    </Seat>
    );
    })}
    </SeatsGrid>
    </HallContainer>
    );
    };
    
    export default CircusHall;