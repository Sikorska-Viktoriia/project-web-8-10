import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BookingService from "../services/BookingService";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import "react-toastify/dist/ReactToastify.css";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  width: 220px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0b7dda;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const BookingForm = ({ selectedSeats, setSelectedSeats, showId }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);

  const TICKET_PRICE = 150;

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await BookingService.getBookedSeats(showId);
        console.log("Отримані заброньовані місця:", res);

        // Переконуємося, що bookedSeats - масив
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
    setTotalPrice(selectedSeats.length * TICKET_PRICE);
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

  const generatePDF = ({ name, phone, email, seats, totalPrice }) => {
    const doc = new jsPDF();
    doc.text("Дані бронювання", 10, 10);
    doc.text(`Ім’я: ${name}`, 10, 20);
    doc.text(`Телефон: ${phone}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Місця: ${seats.join(", ")}`, 10, 50);
    doc.text(`Сума: ${totalPrice} грн`, 10, 60);
    doc.save(`ticket_${name}_${Date.now()}.pdf`);
  };

  const checkForBookedSeats = (selectedSeats) => {
    // Переконуємося, що bookedSeats - масив і використовуємо includes
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
        isPurchasing,
        date: new Date().toISOString(),
      };

      // Передаємо email в BookingService.bookSeats
      await BookingService.bookSeats(selectedSeats, name, email, showId);

      if (isPurchasing) {
        await BookingService.purchaseTickets(selectedSeats, userData, showId);
        toast.success("Квитки куплені!");
        generatePDF(userData);
      } else {
        toast.success("Місця заброньовано!");
      }

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
      <h3>Бронювання</h3>

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

      <div>
        <label>
          <input
            type="checkbox"
            checked={isPurchasing}
            onChange={() => setIsPurchasing((prev) => !prev)}
          />
          Купити квитки відразу
        </label>
      </div>

      <p>Кількість місць: {selectedSeats.length}</p>
      <p>Сума: {totalPrice} грн</p>

      <Button type="submit">
        {isPurchasing ? "Купити квитки" : "Забронювати"}
      </Button>
    </FormContainer>
  );
};

export default BookingForm;
