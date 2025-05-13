// import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import shows from "../data/shows";
import CircusHall from "../components/CircusHall";
import BookingForm from "../components/BookingForm"; // Компонент форми для бронювання

const BookingContainer = styled.div`
  padding: 40px;
  background: #f9f9f9;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const ShowInfo = styled.div`
  margin-bottom: 30px;
`;

const Booking = () => {
  const { showId } = useParams();
  const show = shows.find((s) => s.id.toString() === showId);

  if (!show) {
    return <BookingContainer>Шоу не знайдено.</BookingContainer>;
  }

  return (
    <BookingContainer>
      <Title>Бронювання: {show.title}</Title>
      <ShowInfo>
        <p><strong>Опис:</strong> {show.description}</p>
        <p><strong>Дата:</strong> {show.date}</p>
        <p><strong>Час:</strong> {show.time}</p>
        <p><strong>Місце:</strong> {show.location}</p>
      </ShowInfo>

      <h2>Вибір місць:</h2>
      <CircusHall showId={show.id} />

      <h2>Введіть дані для бронювання:</h2>
      <BookingForm selectedSeats={[]} />
    </BookingContainer>
  );
};


export default Booking;
