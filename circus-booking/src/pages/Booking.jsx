import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import BookingService from "../services/BookingService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Стилі
const Seat = styled.div`
  width: 40px;
  height: 40px;
  margin: 5px;
  background-color: ${(props) =>
    props.booked ? "#f44336" :
    props.selected ? "#2196f3" : "#4caf50"};
  border-radius: 5px;
  cursor: ${(props) => (props.booked ? "not-allowed" : "pointer")};
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const SeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  max-width: 420px;
  margin: 20px auto;
`;

const BookingForm = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  max-width: 400px;
  margin: auto;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #1976d2;
  }
`;

// Головний компонент
const Booking = () => {
  const { id } = useParams(); // id вистави
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    const fetchData = async () => {
      const booked = await BookingService.getBookedSeats(id);
      setBookedSeats(booked || []);
    };
    fetchData();
  }, [id]);

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleBooking = async (e) => {
    e.preventDefault();
    const { name, phone, email } = formData;

    if (!name || !phone || !email) {
      toast.error("Будь ласка, заповніть усі поля");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Невірний формат email");
      return;
    }

    const booking = {
      showId: id,
      seats: selectedSeats,
      user: { name, phone, email }
    };

    await BookingService.saveBooking(booking);
    toast.success("Бронювання успішно збережено!");
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    setSelectedSeats([]);
    setFormData({ name: "", phone: "", email: "" });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Оберіть місця</h2>
      <SeatGrid>
        {[...Array(50)].map((_, index) => {
          const seatNumber = index + 1;
          return (
            <Seat
              key={seatNumber}
              booked={bookedSeats.includes(seatNumber)}
              selected={selectedSeats.includes(seatNumber)}
              onClick={() => toggleSeat(seatNumber)}
            >
              {seatNumber}
            </Seat>
          );
        })}
      </SeatGrid>

      {selectedSeats.length > 0 && (
        <BookingForm onSubmit={handleBooking}>
          <h3>Заповніть форму бронювання</h3>
          <Input
            name="name"
            placeholder="Ваше ім'я"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button type="submit">Забронювати</Button>
        </BookingForm>
      )}
    </div>
  );
};

export default Booking;
