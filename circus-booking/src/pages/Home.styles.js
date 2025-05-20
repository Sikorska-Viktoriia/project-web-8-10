// Improved Home.styles.js and Home.jsx

// =================== Home.styles.js ===================
import styled, { keyframes } from 'styled-components';

const glow = keyframes `
  0%, 100% { text-shadow: 0 0 6px #c0392b, 0 0 12px #e74c3c; }
  50% { text-shadow: 0 0 12px #c0392b, 0 0 18px #e74c3c; }
`;

const fadeInUp = keyframes `
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes `
  0%, 100% { box-shadow: 0 0 6px rgba(192, 57, 43, 0.6); }
  50% { box-shadow: 0 0 14px rgba(192, 57, 43, 0.9); }
`;

export const PageContainer = styled.div `
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f6fb;
  color: #34495e;

  &.dark {
    background-color: #121212;
    color: #eee;
  }
`;


export const Title = styled.h1 `
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  color: #c0392b;
  animation: ${glow} 3s ease-in-out infinite;
`;

export const HistorySection = styled.section `
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
  padding: 12px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1.5px solid #c0392b;
  margin-bottom: 30px;
  background-color: #f9fbfe;
  color: #34495e;
  transition: 0.3s;

  &:focus {
    border-color: #e74c3c;
    box-shadow: 0 0 8px rgba(231, 76, 60, 0.5);
    outline: none;
  }
`;

export const FilterSection = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
`;

export const FilterSelect = styled.select `
  flex: 1 1 200px;
  padding: 12px;
  border-radius: 10px;
  border: 1.5px solid #c0392b;
  font-size: 1rem;
  background-color: #eaf3ff;
  color: #34495e;
  cursor: pointer;
  transition: 0.3s;

  &:hover, &:focus {
    border-color: #e74c3c;
    outline: none;
  }
`;

export const DatePickerWrapper = styled.div `
  flex: 1 1 200px;

  .date-picker-input {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1.5px solid #c0392b;
    font-size: 1rem;
    background-color: #eaf3ff;
    color: #34495e;
    cursor: pointer;

    &:focus {
      border-color: #e74c3c;
      box-shadow: 0 0 8px rgba(231, 76, 60, 0.5);
      outline: none;
    }
  }

  .react-datepicker-popper {
    z-index: 1000;
  }
`;

export const ShowGrid = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
`;

export const Logo = styled.img `
  width: 120px;
  display: block;
  margin: 0 auto 20px;
`;

export const ThemeToggle = styled.button `
  background: transparent;
  border: 2px solid #c0392b;
  color: #c0392b;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;

  &:hover {
    background-color: #c0392b;
    color: #fff;
  }
`;

export const ShowCard = styled.div `
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(192, 57, 43, 0.1);
  padding: 20px;
  text-align: center;
  cursor: default;
  animation: ${fadeInUp} 0.8s ease forwards;
  transition: transform 0.3s, box-shadow 0.3s;

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
  transition: transform 0.3s, filter 0.3s;

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
  min-height: 60px;
  margin-bottom: 15px;
`;

export const ShowInfo = styled.p `
  font-size: 0.95rem;
  color: #7b8a97;
  margin-bottom: 15px;
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
  transition: background-color 0.3s;

  &:hover {
    background-color: #e74c3c;
  }
`;

export const PaginationContainer = styled.div `
  margin-top: 20px;
  display: flex;
  justify-content: center; /* Центрування пагінації по горизонталі */
  gap: 10px; /* Відстань між кнопками */
`;

export const PaginationButton = styled.button `
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? '#4CAF50' : '#eee')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  box-shadow: ${({ active }) => (active ? '0 0 5px #4CAF50' : 'none')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#4CAF50' : '#ccc')};
  }
`;


// За потреби додамо також контейнер для кнопок Next/Prev окремо, але це не обов'язково.