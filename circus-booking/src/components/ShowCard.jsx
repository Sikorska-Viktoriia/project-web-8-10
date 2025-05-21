// ShowCard.jsx
import React from 'react';
import {
  ShowCard as StyledShowCard,
  ShowImage,
  ShowTitle,
  ShowDescription,
  ShowInfo,
  BookButton
} from "../pages/Home.styles";

const ShowCard = ({ show, onBook }) => {
  return (
    <StyledShowCard>
      <ShowImage src={show.image} alt={show.title} />
      <ShowTitle>{show.title}</ShowTitle>
      <ShowDescription>{show.description}</ShowDescription>
      <ShowInfo><strong>Дата:</strong> {show.date}</ShowInfo>
      <ShowInfo><strong>Місто:</strong> {show.city}</ShowInfo>
      <ShowInfo><strong>Час:</strong> {show.time}</ShowInfo>
      {show.price !== undefined && <ShowInfo><strong>Ціна:</strong> {show.price} грн</ShowInfo>}
      <BookButton onClick={() => onBook(show)}>Забронювати</BookButton>
    </StyledShowCard>
  );
};

export default ShowCard;
