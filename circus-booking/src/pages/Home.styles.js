import styled, { keyframes } from 'styled-components';

// Glow animation for title
const glow = keyframes `
  0%, 100% {
    text-shadow: 0 0 6px #c0392b, 0 0 12px #e74c3c;
  }
  50% {
    text-shadow: 0 0 12px #c0392b, 0 0 18px #e74c3c;
  }
`;

// Fade-in and up animation
const fadeInUp = keyframes `
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Pulse animation for button
const pulse = keyframes `
  0%, 100% {
    box-shadow: 0 0 6px rgba(192, 57, 43, 0.6);
  }
  50% {
    box-shadow: 0 0 14px rgba(192, 57, 43, 0.9);
  }
`;

export const PageContainer = styled.div `
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f6fb;
  color: #34495e;
`;

export const Title = styled.h1 `
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  color: #c0392b;
  animation: ${glow} 3s ease-in-out infinite;
`;

export const HistorySection = styled.div `
  background-color: #dbe9ff;
  padding: 20px;
  border-radius: 12px;
  font-size: 1.2rem;
  margin-bottom: 35px;
  box-shadow: 0 6px 12px rgba(192, 57, 43, 0.15);
  animation: ${fadeInUp} 1s ease forwards;
`;

export const SearchBar = styled.input `
  width: 100%;
  padding: 12px 15px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1.5px solid #c0392b;
  margin-bottom: 30px;
  outline: none;
  background-color: #f9fbfe;
  color: #34495e;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #e74c3c;
    box-shadow: 0 0 8px rgba(231, 76, 60, 0.5);
  }
`;

export const FilterSection = styled.div `
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const FilterSelect = styled.select `
  flex: 1 1 200px;
  min-width: 150px;
  padding: 12px 15px;
  border-radius: 10px;
  border: 1.5px solid #c0392b;
  font-size: 1rem;
  cursor: pointer;
  background-color: #eaf3ff;
  color: #34495e;
  transition: border-color 0.3s ease;

  &:hover,
  &:focus {
    border-color: #e74c3c;
    outline: none;
  }
`;

// Обгортка для DatePicker для правильного флексу і ширини
export const DatePickerWrapper = styled.div `
  flex: 1 1 200px;
  min-width: 150px;

  .date-picker-input {
    width: 100% !important;
    padding: 12px 15px;
    border-radius: 10px;
    border: 1.5px solid #c0392b;
    font-size: 1rem;
    cursor: pointer;
    background-color: #eaf3ff;
    color: #34495e;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #e74c3c;
      box-shadow: 0 0 8px rgba(231, 76, 60, 0.5);
    }
  }

  .react-datepicker-popper {
    z-index: 1000; /* Щоб календар був поверх */
  }
`;

export const ShowGrid = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 280px));

  gap: 25px;
`;

export const ShowCard = styled.div `
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(192, 57, 43, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
  animation: ${fadeInUp} 0.8s ease forwards;
  perspective: 1000px;

  &:hover {
    transform: scale(1.07) translateY(-6px);
    box-shadow: 0 18px 36px rgba(192, 57, 43, 0.3);
  }
`;

export const ShowImage = styled.img `
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
  filter: drop-shadow(0 2px 4px rgba(195, 57, 43, 0.15));
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.12) rotate(1deg);
    filter: drop-shadow(0 6px 12px rgba(192, 57, 43, 0.5));
  }
`;

export const ShowTitle = styled.h2 `
  font-size: 1.6rem;
  color: #c0392b;
  margin-bottom: 12px;
`;

export const ShowDescription = styled.p `
  font-size: 1rem;
  color: #5d6d7e;
  margin-bottom: 15px;
  min-height: 60px;
`;

export const ShowInfo = styled.p `
  font-size: 0.95rem;
  color: #7b8a97;
  margin-bottom: 15px;
`;
export const Card = styled.div `
  width: 100px;
  max-width: 100px;
  flex-shrink: 0;
 
`;

export const BookButton = styled.button `
  background-color: #c0392b;
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  animation: ${pulse} 4s ease-in-out infinite;
  transition: background-color 0.3s ease;

&:hover {
background-color: #e74c3c;
}
`;