import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import shows from "../data/shows";
import CircusHall from "../components/CircusHall";
import BookingForm from "../components/BookingForm";

// Анімації
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 5px #c0392b, 0 0 10px #e74c3c;
  }
  50% {
    text-shadow: 0 0 15px #c0392b, 0 0 25px #e74c3c;
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 8px rgba(192, 57, 43, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(192, 57, 43, 0.8);
  }
`;

// СТИЛІ
const BookingContainer = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  text-align: center;
  color: #c0392b;
  margin-bottom: 30px;
  animation: ${glow} 3s infinite ease-in-out;
`;

const SectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 600;
  margin: 50px 0 25px;
  color: #c0392b;
  text-align: center;
`;

const ShowInfo = styled.div`
  background-color: #f2f7fc;
  padding: 20px 30px;
  border-radius: 12px;
  border-left: 5px solid #c0392b;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2c3e50;
  box-shadow: 0 4px 10px rgba(192, 57, 43, 0.1);
`;

const Bold = styled.span`
  font-weight: 600;
  color: #c0392b;
`;

export const BookButton = styled.button`
  background-color: #c0392b;
  color: #ffffff;
  padding: 12px 28px;
  font-size: 1.1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  animation: ${pulse} 2.5s infinite ease-in-out;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e74c3c;
    box-shadow: 0 0 18px rgba(231, 76, 60, 0.9);
    animation-play-state: paused;
  }
`;

const Booking = () => {
  const { showId } = useParams();
  const show = shows.find((s) => s.id.toString() === showId);

  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!show) {
    return (
      <BookingContainer>
        <Title>Шоу не знайдено</Title>
      </BookingContainer>
    );
  }

  return (
    <BookingContainer>
      <Title>Бронювання: {show.title}</Title>

      <ShowInfo>
        <p>
          <Bold>Опис:</Bold> {show.description}
        </p>
        <p>
          <Bold>Дата:</Bold> {show.date}
        </p>
        <p>
          <Bold>Час:</Bold> {show.time}
        </p>
        <p>
          <Bold>Місце:</Bold> {show.location}
        </p>
      </ShowInfo>

      <SectionTitle>Вибір місць</SectionTitle>
      <CircusHall
        showId={show.id}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />

      <SectionTitle>Дані для бронювання</SectionTitle>
      <BookingForm
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        showId={show.id}
      />
    </BookingContainer>
  );
};

export default Booking;
