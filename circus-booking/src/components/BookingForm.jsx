import React, { useState } from "react";
import styled from "styled-components";
import BookingService from "../services/BookingService";

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
  const [phone, setPhone] = useState(""); // Додано поле для телефону
  const [email, setEmail] = useState(""); // Додано поле для email

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0 || name.trim() === "" || phone.trim() === "" || email.trim() === "") {
      alert("Введіть всі дані та виберіть місця!");
      return;
    }

    try {
      const response = await BookingService.bookSeats(selectedSeats, { name, phone, email });
      alert("Бронювання успішне!");
    } catch (err) {
      alert("Помилка при бронюванні!");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>Бронювання</h3>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше ім’я"
      />
      <Input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Ваш телефон"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ваш email"
      />
      <Button type="submit">Забронювати</Button>
    </FormContainer>
  );
};

export default BookingForm;
