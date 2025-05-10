import React, { useState } from 'react';
import ShowCard from './ShowCard';
import styled from 'styled-components';

const ShowListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  margin: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ShowList = ({ shows }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Пошук вистав"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ShowListContainer>
        {filteredShows.map(show => (
          <ShowCard key={show.id} show={show} />
        ))}
      </ShowListContainer>
    </div>
  );
};

export default ShowList;