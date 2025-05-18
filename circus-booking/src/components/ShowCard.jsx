import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(37, 117, 252, 0.25);
  cursor: pointer;
  background: linear-gradient(145deg, #6a11cb, #2575fc);
  color: #fff;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  &:hover {
    transform: scale(1.07);
    box-shadow: 0 18px 36px rgba(37, 117, 252, 0.45);
  }
`;


const Image = styled.img`
  width: 100%;
  max-height: 160px;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.3);
  object-fit: cover;
  display: block;
  margin: 0 auto;
`;


const Title = styled.h3`
  margin-top: 15px;
  font-size: 22px;
  font-weight: 700;
  text-shadow: 0 2px 6px rgba(0,0,0,0.4);
`;

const Description = styled.p`
  color: #d1d9ff;
  font-size: 14px;
  margin: 10px 0 15px;
  min-height: 40px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
`;

const DateTime = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #a3b0ff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
`;

const ShowCard = ({ show }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/booking/${show.id}`)}>
      <Image src={show.imageUrl} alt={show.title} />
      <Title>{show.title}</Title>
      <Description>{show.description}</Description>
      <DateTime>{show.date} {show.time}</DateTime>
    </Card>
  );
};

export default ShowCard;
