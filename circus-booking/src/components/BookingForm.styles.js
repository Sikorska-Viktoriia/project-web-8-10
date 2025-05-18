import styled, { keyframes } from "styled-components";

// Анімації
const glow = keyframes `
  0%, 100% {
    text-shadow: 0 0 5px #c0392b, 0 0 10px #e74c3c;
  }
  50% {
    text-shadow: 0 0 15px #c0392b, 0 0 25px #e74c3c;
  }
`;

const fadeInUp = keyframes `
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes `
  0%, 100% {
    box-shadow: 0 0 10px rgba(192, 57, 43, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(192, 57, 43, 0.8);
  }
`;

// Контейнер форми
export const FormContainer = styled.form `
  max-width: 460px;
  margin: 40px auto;
  padding: 40px;
  background: linear-gradient(135deg, #fff5f5, #fdecea);
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  animation: ${fadeInUp} 0.8s ease forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Заголовок
export const Title = styled.h3 `
  margin-bottom: 25px;
  font-size: 2.4rem;
  font-weight: 800;
  color: #c0392b;
  animation: ${glow} 3s ease-in-out infinite;
  text-align: center;
  letter-spacing: 1px;
`;

// Інпут
export const Input = styled.input `
  width: 100%;
  margin: 12px 0;
  padding: 14px 16px;
  border-radius: 14px;
  border: 2px solid #e74c3c;
  background-color: #fff;
  font-size: 1rem;
  color: #2c3e50;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #c0392b;
    box-shadow: 0 0 12px rgba(231, 76, 60, 0.3);
    outline: none;
  }
`;

// Кнопка
export const Button = styled.button `
  margin-top: 24px;
  width: 100%;
  padding: 14px 20px;
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  animation: ${pulse} 3.5s ease-in-out infinite;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #e74c3c;
    transform: scale(1.02);
    animation-play-state: paused;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    animation: none;
  }
`;

// Чекбокс
export const CheckboxContainer = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 16px;
  font-size: 0.95rem;
  color: #2c3e50;

  input {
    margin-right: 10px;
    transform: scale(1.3);
    cursor: pointer;
  }

  label {
    cursor: pointer;
    user-select: none;
  }
`;

// Додатковий текст
export const InfoText = styled.p `
  margin-top: 18px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #7f8c8d;
  text-align: center;
  user-select: none;
`;