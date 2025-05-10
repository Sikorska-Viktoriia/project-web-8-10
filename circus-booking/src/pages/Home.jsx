import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import shows from '../data/shows';

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  padding: 50px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 20px;
`;

const HistorySection = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const SearchBar = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
`;

const FilterSelect = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ShowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ShowCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ShowImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const ShowTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 10px;
`;

const ShowDescription = styled.p`
  font-size: 1rem;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const navigate = useNavigate();

  const filteredShows = shows.filter((show) => {
    const matchesSearch = show.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? show.type === filterType : true;
    const matchesDate = filterDate
      ? new Date(show.date).toLocaleDateString() === filterDate.toLocaleDateString()
      : true;
    return matchesSearch && matchesType && matchesDate;
  });

  const handleBookShow = (show) => {
    navigate(`/booking/${show.id}`);
  };

  return (
    <PageContainer>
      <Title>Цирк "Захоплення"</Title>
      <HistorySection>
        <p>Цирк "Захоплення" є одним з найстаріших цирків у світі, що має багатовікову історію та безліч захоплюючих подій!</p>
      </HistorySection>

      <SearchBar
        type="text"
        placeholder="Пошук за назвою події..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <FilterSection>
        <FilterSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Виберіть жанр</option>
          <option value="Клоуни">Клоуни</option>
          <option value="Акробати">Акробати</option>
          <option value="Жонглери">Жонглери</option>
          <option value="Магія">Магія</option>
        </FilterSelect>

        <DatePicker
          selected={filterDate}
          onChange={(date) => setFilterDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Виберіть дату"
        />
      </FilterSection>

      <ShowGrid>
        {filteredShows.map((show) => (
          <ShowCard key={show.id}>
            <ShowImage src={show.image} alt={show.title} />
            <ShowTitle>{show.title}</ShowTitle>
            <ShowDescription>{show.description}</ShowDescription>
            <p><strong>Дата:</strong> {show.date}</p>
            <p><strong>Час:</strong> {show.time}</p>
            <Button onClick={() => handleBookShow(show)}>Забронювати</Button>
          </ShowCard>
        ))}
      </ShowGrid>
    </PageContainer>
  );
};

export default Home;
