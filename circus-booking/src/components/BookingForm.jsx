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

const BookingForm = ({ selectedSeats, setSelectedSeats, showId, onClose }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);

  const VIP_PRICE = 200;
  const REGULAR_PRICE = 100;

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
    const sum = selectedSeats.reduce(
      (acc, seatId) => acc + getSeatPrice(seatId),
      0
    );
    setTotalPrice(sum);
  }, [selectedSeats]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^\d{10,13}$/.test(phone);

  const validateName = (name) => {
  const trimmed = name.trim();
  return /^[А-Яа-яA-Za-zІіЇїЄєҐґ ]+$/.test(trimmed) && trimmed.replace(/ /g, "").length >= 2;
};


  const saveToLocalStorage = (data, showId) => {
    const existing = JSON.parse(
      localStorage.getItem(`bookings_${showId}`) || "[]"
    );
    localStorage.setItem(
      `bookings_${showId}`,
      JSON.stringify([...existing, data])
    );
  };

  const checkForBookedSeats = (selectedSeats) => {
    if (!Array.isArray(bookedSeats)) return false;

    const conflict = selectedSeats.filter((seat) =>
      bookedSeats.includes(seat)
    );
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

  if (!validateName(name)) {
    toast.error("Ім’я повинно містити лише літери та бути не коротшим за 2 символи.");
    return;
  }

  if (!validatePhone(phone)) {
    toast.error("Телефон має містити від 10 до 13 цифр.");
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

    
    if (onClose) onClose();
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
      {formData.name && !validateName(formData.name) && (
        <InfoText style={{ color: "red" }}>
          Ім’я має містити лише літери та бути не коротшим за 2 символи
        </InfoText>
      )}

      <Input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Ваш телефон"
        required
      />
      {formData.phone && !validatePhone(formData.phone) && (
        <InfoText style={{ color: "red" }}>
          Телефон має містити від 10 до 13 цифр
        </InfoText>
      )}

      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Ваш email"
        required
      />
      {formData.email && !validateEmail(formData.email) && (
        <InfoText style={{ color: "red" }}>
          Введіть правильний email
        </InfoText>
      )}

      <InfoText>Кількість місць: {selectedSeats.length}</InfoText>
      <InfoText>Сума: {totalPrice} грн</InfoText>

      <Button type="submit">Забронювати</Button>
    </FormContainer>
  );
};

export default BookingForm;
