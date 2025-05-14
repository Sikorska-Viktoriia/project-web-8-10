import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  width: 250px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
  background-color: #fff;
  text-align: center;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin-top: 10px;
  font-size: 20px;
`;

const Description = styled.p`
  color: #555;
  margin: 10px 0;
`;


const ShowCard = ({ show }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/booking/${show.id}`)}>
      <Image src={show.imageUrl} alt={show.title} />
      <Title>{show.title}</Title>
      <Description>{show.description}</Description>
      <p>{show.date} {show.time}</p>
    </Card>
  );
};


export default ShowCard;
