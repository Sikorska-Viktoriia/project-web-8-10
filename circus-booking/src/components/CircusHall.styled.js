import styled, { keyframes } from "styled-components";

// М'яке світіння заголовка
const softGlow = keyframes `
  0%, 100% {
    text-shadow:
      0 0 4px #e67e22,
      0 0 8px #e67e22;
  }
  50% {
    text-shadow:
      0 0 8px #f39c12,
      0 0 14px #f39c12;
  }
`;

// М'яка пульсація кнопки
const gentlePulse = keyframes `
  0%, 100% {
    box-shadow:
      0 0 6px rgba(230, 126, 34, 0.5);
  }
  50% {
    box-shadow:
      0 0 12px rgba(241, 196, 15, 0.7);
  }
`;

// Плавний рух смуг фону
const stripesMove = keyframes `
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
`;

export const Container = styled.div `
  max-width: 900px;
  margin: 40px auto;
  padding: 40px 50px;
  background: repeating-linear-gradient(
    90deg,
rgba(211, 0, 0, 0.59) 0 40px,
    #f0e6d2 40px 80px
  );
  border-radius: 20px;
  box-shadow:
    inset 0 0 40px rgba(211, 84, 0, 0.3),
    0 8px 20px rgba(211, 84, 0, 0.4);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #6e2c00;
  animation: ${stripesMove} 20s linear infinite;

  @media (max-width: 768px) {
    padding: 30px 25px;
    margin: 20px 15px;
  }
`;

export const Title = styled.h1 `
  font-size: 3.8rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 35px;
  color:rgb(0, 102, 211);
  animation: ${softGlow} 4s ease-in-out infinite;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow:
    0 0 6px #d35400,
    0 0 12px #f39c12;

  @media (max-width: 768px) {
    font-size: 2.6rem;
    margin-bottom: 25px;
  }
`;

export const ConfirmButton = styled.button `
  background-color:rgba(48, 161, 247, 0.79);
  color: #4e2a00;
  padding: 14px 28px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 28px;
  border: 2px solidrgb(16, 92, 214);
  cursor: pointer;
  margin: 0 auto;
  display: block;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 12px rgba(243, 156, 18, 0.5);
  animation: ${gentlePulse} 5s ease-in-out infinite;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #f1c40f;
    box-shadow:
      0 0 20px #f1c40f,
      0 0 30px #f39c12;
  }

  &:disabled {
    background-color: #ccc;
    color: #888;
    cursor: not-allowed;
    animation: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;