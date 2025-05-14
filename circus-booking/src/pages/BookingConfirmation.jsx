import React from "react";

const BookingConfirmation = () => {
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));

  if (!bookingData) {
    return <div>Немає інформації про бронювання.</div>;
  }

  return (
    <div>
      <h2>Підтвердження бронювання</h2>
      <p>Ім'я: {bookingData.name}</p>
      <p>Телефон: {bookingData.phone}</p>
      <p>Email: {bookingData.email}</p>
      <p>Місця: {bookingData.seats.join(", ")}</p>
      <p>Дата: {new Date(bookingData.date).toLocaleString()}</p>
      <p>Загальна сума: {bookingData.totalPrice} грн</p>
      <p>{bookingData.isPurchasing ? "Квитки успішно куплені!" : "Бронювання успішне!"}</p>
    </div>
  );
};

export default BookingConfirmation;
