import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import shows from '../data/shows';
import './Home.css';

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
      ? new Date(show.date).toLocaleDateString() === filterDate.toLocaleDateString()
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
    <div className="page-container">
      <h1 className="title">Цирк "Захоплення"</h1>
      <div className="history-section">
        <p>Цирк "Захоплення" є одним з найстаріших цирків у світі, що має багатовікову історію та безліч захоплюючих подій!</p>
      </div>

      <input
        className="search-bar"
        type="text"
        placeholder="Пошук за назвою події..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-section">
        <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Виберіть жанр</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          className="location-select"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">Виберіть локацію</option>
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        <DatePicker
          selected={filterDate}
          onChange={(date) => setFilterDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Виберіть дату"
          highlightDates={shows.map(show => new Date(show.date))}
          className="date-picker"
        />
      </div>

      <div className="show-grid">
        {filteredShows.map((show) => (
          <div key={show.id} className="show-card">
            <img className="show-image" src={show.image} alt={show.title} />
            <h2 className="show-title">{show.title}</h2>
            <p className="show-description">{show.description}</p>
            <p><strong>Дата:</strong> {show.date}</p>
            <p><strong>Час:</strong> {show.time}</p>
            <button className="book-button" onClick={() => handleBookShow(show)}>Забронювати</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
