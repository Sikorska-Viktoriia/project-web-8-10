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
  flex: 1 1 250px;
  max-width: 350px;
  padding: 14px 18px;
  font-size: 1rem;
  border-radius: 14px;
  border: 2px solid #c0392b;
  margin-bottom: 25px; /* Відступ знизу для розділення з фільтрами */
  background-color: #fefefe;
  color: #2c3e50;
  box-shadow: 0 2px 6px rgba(192, 57, 43, 0.15);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #e74c3c;
    box-shadow: 0 0 10px rgba(231, 76, 60, 0.6);
    outline: none;
  }

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

export const FilterSection = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 28px; /* Трохи більший gap для більшого простору */
  margin-bottom: 40px;
  justify-content: center;
`;

export const FilterSelect = styled.select `
  flex: 1 1 180px;
  max-width: 220px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 2px solid #c0392b;
  font-size: 1rem;
  background-color: #eaf3ff;
  color: #34495e;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(192, 57, 43, 0.15);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover,
  &:focus {
    border-color: #e74c3c;
    box-shadow: 0 0 10px rgba(231, 76, 60, 0.4);
    outline: none;
  }

  @media (max-width: 768px) {
    flex: 1 1 45%;
    max-width: none;
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

export const DatePickerWrapper = styled.div `
  position: relative;
  flex: 1 1 260px;
  max-width: 260px;
   
  .date-picker-input {
    width: 90%;
    height: 15%;
    padding: 14px 18px;
    border-radius: 14px;
    border: 2px solid #c0392b;
    font-size: 1rem;
    background-color: #eaf3ff;
    color: #34495e;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(192, 57, 43, 0.15);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      border-color: #e74c3c;
      box-shadow: 0 0 10px rgba(231, 76, 60, 0.6);
      outline: none;
    }
  }

  .react-datepicker-popper {
    z-index: 1000;
  }

  @media (max-width: 768px) {
    flex: 1 1 45%;
    max-width: none;
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

export const ClearFiltersButton = styled.button `
  padding: 12px 26px;
  background-color: transparent;
  border: 2px solid #c0392b;
  border-radius: 14px;
  color: #c0392b;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(192, 57, 43, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background-color: #c0392b;
    color: white;
    box-shadow: 0 4px 12px rgba(192, 57, 43, 0.4);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;



export const FilterControls = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  flex: 1 1 auto;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;



export const ClearButton = styled.button `
  flex: 0 0 auto;
  padding: 10px 20px;
  border-radius: 12px;
  border: 2px solid #c0392b;
  background-color: transparent;
  color: #c0392b;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #c0392b;
    color: #fff;
    box-shadow: 0 0 10px rgba(192, 57, 43, 0.8);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 12px rgba(231, 76, 60, 0.9);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 0;
  }
`;

export const ShowGrid = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
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

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 450px;

  @media (max-width: 768px) {
    min-height: 400px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    min-height: 350px;
    padding: 12px;
  }

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

  @media (max-width: 768px) {
    height: 150px;
  }

  @media (max-width: 480px) {
    height: 130px;
  }

  &:hover {
    transform: scale(1.12) rotate(1deg);
    filter: drop-shadow(0 6px 12px rgba(192, 57, 43, 0.5));
  }
`;

export const ShowTitle = styled.h2 `
  font-size: 1.6rem;
  color: #c0392b;
  margin: 12px 0;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const ShowDescription = styled.p `
  font-size: 1rem;
  color: #5d6d7e;
  min-height: 80px;
  max-height: 80px;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    min-height: 70px;
    max-height: 70px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    min-height: 60px;
    max-height: 60px;
    font-size: 0.85rem;
  }
`;

export const ShowInfo = styled.p `
  font-size: 0.95rem;
  color: #7b8a97;
  margin-bottom: 15px;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
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

  @media (max-width: 768px) {
    padding: 10px 25px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 0.9rem;
  }

  &:hover {
    background-color: #e74c3c;
  }
`;

export const PaginationContainer = styled.div `
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 8px;
    flex-wrap: wrap;
  }
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

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.85rem;
  }

  &:hover {
    background-color: ${({ active }) => (active ? '#4CAF50' : '#ccc')};
  }
`;


export const Logo = styled.img `
  position: fixed;       /* Фіксуємо лого на екрані */
  top: 20px;             /* Відступ зверху */
  left: 20px;            /* Відступ зліва */
  width: 100px;          /* Ширина лого */
  height: auto;
  border-radius: 12px;   /* Закруглені кути */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);  /* Легка тінь */
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(192, 57, 43, 0.35);
  }

  @media (max-width: 768px) {
    width: 80px;
    top: 15px;
    left: 15px;
  }

  @media (max-width: 480px) {
    width: 60px;
    top: 10px;
    left: 10px;
  }
`;