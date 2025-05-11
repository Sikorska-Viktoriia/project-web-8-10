import React, { useState } from "react";
import styled from "styled-components";
import BookingService from "../services/BookingService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px;
  padding: 8px;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0b7dda;
  }
`;

const BookingForm = ({ selectedSeats }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim() || selectedSeats.length === 0) {
      toast.error("Будь ласка, заповніть усі поля та виберіть місця.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Некоректний email.");
      return;
    }

    try {
      await BookingService.bookSeats(selectedSeats, { name, phone, email });
      toast.success("Бронювання успішне!");

      // Очистити поля
      setName("");
      setPhone("");
      setEmail("");
    } catch {
      toast.error("Сталася помилка при бронюванні.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} autoComplete="off">
      <h3>Бронювання</h3>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше ім’я"
        required
      />
      <Input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Ваш телефон"
        required
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ваш email"
        required
      />
      <Button type="submit">Забронювати</Button>
    </FormContainer>
  );
};

export default BookingForm;
