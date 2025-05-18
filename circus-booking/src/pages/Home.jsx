import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import shows from '../data/shows';

import {
  PageContainer,
  Title,
  HistorySection,
  SearchBar,
  FilterSection,
  FilterSelect,
  DatePickerWrapper,
  ShowGrid,
  ShowCard,
  ShowImage,
  ShowTitle,
  ShowDescription,
  ShowInfo,
  BookButton
} from './Home.styles';

const Home = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [filterLocation, setFilterLocation] = useState('');
  const navigate = useNavigate();

  const uniqueTypes = [...new Set(shows.map(show => show.type))];
  const uniqueLocations = [...new Set(shows.map(show => show.city))];

  const filteredShows = shows.filter((show) => {
    const matchesSearch = show.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? show.type === filterType : true;
    const matchesDate = filterDate
      ? new Date(show.date).toDateString() === filterDate.toDateString()
      : true;
    const matchesLocation = filterLocation
      ? show.city === filterLocation
      : true;
    return matchesSearch && matchesType && matchesDate && matchesLocation;
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
          {uniqueTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </FilterSelect>

        <FilterSelect value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
          <option value="">Виберіть локацію</option>
          {uniqueLocations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </FilterSelect>

        <DatePickerWrapper>
          <DatePicker
            selected={filterDate}
            onChange={setFilterDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Виберіть дату"
            highlightDates={shows.map(show => new Date(show.date))}
            className="date-picker-input"
            isClearable
          />
        </DatePickerWrapper>
      </FilterSection>

      <ShowGrid>
        {filteredShows.map(show => (
          <ShowCard key={show.id}>
            <ShowImage src={show.image} alt={show.title} />
            <ShowTitle>{show.title}</ShowTitle>
            <ShowDescription>{show.description}</ShowDescription>
            <ShowInfo><strong>Дата:</strong> {show.date}</ShowInfo>
            <ShowInfo><strong>Час:</strong> {show.time}</ShowInfo>
            <BookButton onClick={() => handleBookShow(show)}>Забронювати</BookButton>
          </ShowCard>
        ))}
      </ShowGrid>
    </PageContainer>
  );
};

export default Home;
