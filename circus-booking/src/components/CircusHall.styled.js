import styled, { keyframes } from "styled-components";

// Анімації
const softGlow = keyframes `
  0%, 100% {
    text-shadow:
      0 0 6px #e67e22,
      0 0 14px #f39c12;
  }
  50% {
    text-shadow:
      0 0 10px #f39c12,
      0 0 20px #f1c40f;
  }
`;

const gentlePulse = keyframes `
  0%, 100% {
    box-shadow:
      0 0 8px rgba(241, 196, 15, 0.6);
  }
  50% {
    box-shadow:
      0 0 20px rgba(241, 196, 15, 0.9);
  }
`;

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
  margin: 50px auto;
  padding: 50px 60px;
  background: repeating-linear-gradient(
    90deg,
    rgba(211, 0, 0, 0.15) 0 40px,
    #f8f5ec 40px 80px
  );
  border-radius: 24px;
  box-shadow:
    inset 0 0 50px rgba(211, 84, 0, 0.2),
    0 12px 30px rgba(211, 84, 0, 0.25);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #4b2e05;
  animation: ${stripesMove} 25s linear infinite;
  transition: background-color 0.3s ease;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 35px 30px;
    margin: 25px 20px;
  }
`;


export const Title = styled.h1 `
  font-size: 4.2rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 40px;
  color: #0058d4;
  animation: ${softGlow} 5s ease-in-out infinite;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow:
    0 0 8px #d35400,
    0 0 16px #f39c12;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 30px;
  }
`;


export const ConfirmButton = styled.button `
  background-color: rgba(48, 161, 247, 0.85);
  color: #3b2f0b;
  padding: 12px 28px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 32px;
  border: 2.5px solid rgb(10, 75, 190);
  cursor: pointer;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 0 15px rgba(243, 156, 18, 0.6);
  animation: ${gentlePulse} 5s ease-in-out infinite;
  transition: background-color 0.35s ease, box-shadow 0.35s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #f1c40f;
    box-shadow:
      0 0 30px #f1c40f,
      0 0 45px #f39c12;
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    background-color: #d6d6d6;
    color: #999999;
    cursor: not-allowed;
    animation: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 12px 20px;
  }
`;


export const Legend = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 24px;
  flex-wrap: wrap;
  color: #333;
  font-weight: 500;
  font-size: 14px;
  user-select: none;
  padding: 0 10px;
`;


export const LegendItemStyled = styled.div `
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: default;
  user-select: none;
  font-weight: 500;
  font-size: 14px;
  color: #333;

  &::before {
    content: "";
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }

  &.booked::before {
    background-color: #6c757d;
    border: 2px solid #566573;
  }

  &.available::before {
    background: radial-gradient(circle at center, #ffffffcc 40%, #2575fccc 100%);
    border: 2px solid #2575fc;
  }

  &.selected::before {
    background-color: #f39c12;
    border: 2px solid #e67e22;
  }

  &.vip {
    color: #3b2f0b;

    &::before {
      background-color: #f1c40f;
      border: 2px solid #d4ac0d;
    }
  }
`;