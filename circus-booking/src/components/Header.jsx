import React from "react";
import styled from "styled-components";

// Стилізований компонент для заголовку
const HeaderContainer = styled.header`
  background-color: #2196f3;
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: white;
  font-size: 36px;
  font-weight: 600;
  margin: 0;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Бронювання місць на арену</Title>
    </HeaderContainer>
  );
};

export default Header;
