import React, { useState } from "react";
import ArenaLayout from "./ArenaLayout";
import BookingForm from "./BookingForm";
import Header from "./Header";

const MainPage = () => {
  const [showId] = useState(1); // для прикладу
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleBookingSubmit = ({ name, email }) => {
    console.log("Booking details:", { name, email, selectedSeats });
    // Логіка для бронювання
  };

  return (
    <div>
      <Header />
      <ArenaLayout
        showId={showId}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />
      <BookingForm onSubmit={handleBookingSubmit} />
    </div>
  );
};

export default MainPage;
