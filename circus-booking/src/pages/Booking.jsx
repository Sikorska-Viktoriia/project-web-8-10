import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import shows from "../data/shows";
import CircusHall from "../components/CircusHall";
import BookingForm from "../components/BookingForm";
import Modal from "react-modal";



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
    text-shadow: 0 0 8px #c0392b, 0 0 20px #e74c3c;
  }
  50% {
    text-shadow: 0 0 18px #c0392b, 0 0 35px #e74c3c;
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 12px rgba(192, 57, 43, 0.5);
  }
  50% {
    box-shadow: 0 0 28px rgba(192, 57, 43, 0.9);
  }
`;



const BookingContainer = styled.div`
  max-width: 1100px;
  margin: 50px auto 70px;
  padding: 45px 60px;
  background: linear-gradient(135deg, #fff, #f9f7f4);
  border-radius: 24px;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.12);
  animation: ${fadeInUp} 0.8s ease forwards;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;

  @media (max-width: 768px) {
    padding: 30px 25px;
    margin: 30px 15px 50px;
  }
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 900;
  text-align: center;
  color: #c0392b;
  margin-bottom: 40px;
  animation: ${glow} 3.5s infinite ease-in-out;
  letter-spacing: 2.5px;
  user-select: none;

  @media (max-width: 480px) {
    font-size: 2.4rem;
    margin-bottom: 30px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 55px 0 28px;
  color: #c0392b;
  text-align: center;
  letter-spacing: 1.5px;

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin: 40px 0 20px;
  }
`;

const ShowInfo = styled.div`
  background-color: #eaf1f8;
  padding: 25px 35px;
  border-radius: 16px;
  border-left: 6px solid #c0392b;
  font-size: 1.15rem;
  line-height: 1.7;
  color: #34495e;
  box-shadow: 0 6px 18px rgba(192, 57, 43, 0.12);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(192, 57, 43, 0.22);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 20px 25px;
  }
`;

const Bold = styled.span`
  font-weight: 700;
  color: #c0392b;
`;

export const BookButton = styled.button`
  background-color: #c0392b;
  color: #ffffff;
  padding: 14px 36px;
  font-size: 1.15rem;
  font-weight: 700;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  animation: ${pulse} 3s infinite ease-in-out;
  box-shadow: 0 6px 15px rgba(192, 57, 43, 0.7);
  transition: background-color 0.35s ease, box-shadow 0.35s ease, transform 0.2s ease;

  &:hover {
    background-color: #e74c3c;
    box-shadow: 0 0 28px rgba(231, 76, 60, 0.95);
    animation-play-state: paused;
    transform: scale(1.06);
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    background-color: #d6d6d6;
    color: #999999;
    cursor: not-allowed;
    animation: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    padding: 12px 28px;
    font-size: 1rem;
  }
`;


Modal.setAppElement("#root");

export default function Booking() {
  const { showId } = useParams();
  const show = shows.find((s) => s.id.toString() === showId);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!show) {
    return (
      <BookingContainer>
        <Title>Шоу не знайдено</Title>
      </BookingContainer>
    );
  }

  // Відкрити модалку
  const openModal = () => setModalIsOpen(true);

  // Закрити модалку
  const closeModal = () => setModalIsOpen(false);

  return (
    <BookingContainer>
      <Title>Бронювання: {show.title}</Title>

      <ShowInfo>
        <p><Bold>Опис:</Bold> {show.detailedDescription}</p>
        <p><Bold>Дата:</Bold> {show.date}</p>
        <p><Bold>Час:</Bold> {show.time}</p>
        <p><Bold>Місце:</Bold> {show.city}</p>
      </ShowInfo>

      <SectionTitle>Вибір місць</SectionTitle>
      <CircusHall
        showId={show.id}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <BookButton
          onClick={openModal}
          disabled={selectedSeats.length === 0}
        >
          Забронювати
        </BookButton>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Форма бронювання"
        style={{
          content: {
            maxWidth: 600,
            margin: "auto",
            borderRadius: 20,
            padding: 30,
          },
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        }}
      >
        <BookingForm
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          showId={show.id}
        />
        <button
          onClick={closeModal}
          style={{ marginTop: 15 }}
          aria-label="Закрити форму бронювання"
        >
          Закрити
        </button>
      </Modal>
    </BookingContainer>
  );
}