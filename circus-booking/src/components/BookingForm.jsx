import React, { useState, useEffect } from "react";
import {
  FormContainer,
  Title,
  Input,
  Button,
  InfoText,
} from "./BookingForm.styles";
import BookingService from "../services/BookingService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = ({ selectedSeats, setSelectedSeats, showId }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);

  const VIP_PRICE = 300;
  const REGULAR_PRICE = 150;

  const getSeatPrice = (seatId) => (seatId <= 20 ? VIP_PRICE : REGULAR_PRICE);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await BookingService.getBookedSeats(showId);
        const seatsArray = Array.isArray(res)
          ? res
          : Array.isArray(res.bookedSeats)
          ? res.bookedSeats
          : [];

        setBookedSeats(seatsArray);
      } catch (err) {
        console.error("Не вдалося завантажити зайняті місця", err);
        setBookedSeats([]);
      }
    };

    fetchBookedSeats();

    const interval = setInterval(fetchBookedSeats, 5000);
    return () => clearInterval(interval);
  }, [showId]);

  useEffect(() => {
    const sum = selectedSeats.reduce((acc, seatId) => acc + getSeatPrice(seatId), 0);
    setTotalPrice(sum);
  }, [selectedSeats]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const saveToLocalStorage = (data, showId) => {
    const existing = JSON.parse(localStorage.getItem(`bookings_${showId}`) || "[]");
    localStorage.setItem(`bookings_${showId}`, JSON.stringify([...existing, data]));
  };



  const checkForBookedSeats = (selectedSeats) => {
    if (!Array.isArray(bookedSeats)) return false;

    const conflict = selectedSeats.filter((seat) => bookedSeats.includes(seat));
    if (conflict.length > 0) {
      toast.error(`Місця вже зайняті: ${conflict.join(", ")}. Оберіть інші.`);
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email } = formData;

    if (!name.trim() || !phone.trim() || !email.trim() || selectedSeats.length === 0) {
      toast.error("Будь ласка, заповніть усі поля та виберіть місця.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Некоректний email.");
      return;
    }

    if (checkForBookedSeats(selectedSeats)) return;

    try {
      const userData = {
        ...formData,
        seats: selectedSeats,
        totalPrice,
        date: new Date().toISOString(),
      };

      await BookingService.bookSeats(selectedSeats, name, email, showId);

      toast.success("Місця заброньовано!");
      
      saveToLocalStorage(userData, showId);
      setFormData({ name: "", phone: "", email: "" });
      setSelectedSeats([]);
    } catch (error) {
      console.error("Помилка при бронюванні:", error);
      toast.error(`Помилка: ${error.message}`);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} autoComplete="off">
      <Title>Бронювання</Title>

      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Ваше ім’я"
        required
      />
      <Input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Ваш телефон"
        required
      />
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Ваш email"
        required
      />

      <InfoText>Кількість місць: {selectedSeats.length}</InfoText>
      <InfoText>Сума: {totalPrice} грн</InfoText>

      <Button type="submit">Забронювати</Button>
    </FormContainer>
  );
};

export default BookingForm;
