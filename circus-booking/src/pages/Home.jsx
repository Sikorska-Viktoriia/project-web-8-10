// Home.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import shows from '../data/shows';
import circusLogo from '../assets/circus-logo.png';

import {
  PageContainer,
  Title,
  Logo,
  HistorySection,
  SearchBar,
  FilterSection,
  FilterSelect,
  DatePickerWrapper
} from './Home.styles';

import ShowList from '../components/ShowList';


const Home = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [filterLocation, setFilterLocation] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const navigate = useNavigate();

  const uniqueTypes = useMemo(() => [...new Set(shows.map(show => show.type))], []);
  const uniqueLocations = useMemo(() => [...new Set(shows.map(show => show.city))], []);

  const filteredShows = useMemo(() => {
    return shows.filter(show => {
      const matchesSearch = show.title.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType ? show.type === filterType : true;
      const matchesDate = filterDate ? new Date(show.date).toDateString() === filterDate.toDateString() : true;
      const matchesLocation = filterLocation ? show.city === filterLocation : true;
      return matchesSearch && matchesType && matchesDate && matchesLocation;
    });
  }, [search, filterType, filterDate, filterLocation]);

  const sortedShows = useMemo(() => {
    return [...filteredShows].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price':
          return (a.price ?? 0) - (b.price ?? 0);
        default:
          return 0;
      }
    });
  }, [filteredShows, sortBy]);

  const totalPages = Math.ceil(sortedShows.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterType, filterDate, filterLocation, sortBy]);

  const paginatedShows = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedShows.slice(start, start + itemsPerPage);
  }, [sortedShows, currentPage, itemsPerPage]);

  const handleBookShow = (show) => {
    navigate(`/booking/${show.id}`);
  };

  const clearFilters = () => {
    setSearch('');
    setFilterType('');
    setFilterDate(null);
    setFilterLocation('');
    setSortBy('');
  };

  return (
    <PageContainer>
      <Logo src={circusLogo} alt="Circus Logo" />
      <Title>Цирк "На дроті!"</Title>

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

        <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Сортувати за</option>
          <option value="date">Датою</option>
          <option value="title">Назвою</option>
          <option value="price">Ціною</option>
        </FilterSelect>

        <button onClick={clearFilters}>Очистити фільтри</button>
      </FilterSection>

      <p>Знайдено подій: {sortedShows.length}</p>

      {sortedShows.length === 0 ? (
        <p>Подій за вказаними фільтрами не знайдено.</p>
      ) : (
        <ShowList
          shows={paginatedShows}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onBook={handleBookShow}
        />
      )}
    </PageContainer>
  );
};

export default Home;
