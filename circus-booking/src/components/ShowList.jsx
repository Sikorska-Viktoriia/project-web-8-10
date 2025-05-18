import React, { useState } from 'react';
import ShowCard from './ShowCard';
import styled from 'styled-components';

const ShowListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 28px;
  padding-bottom: 60px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 320px;
  padding: 14px 20px;
  margin: 0 auto 40px auto;
  display: block;
  border-radius: 30px;
  border: 2px solid #2575fc;
  font-size: 16px;
  outline: none;
  transition: box-shadow 0.3s ease;

  &::placeholder {
    color: #7a8cb5;
  }

  &:focus {
    box-shadow: 0 0 10px #2575fc;
    border-color: #6a11cb;
  }
`;

const ShowCardWrapper = styled.div`
  flex: 1 1 260px;  /* мінімальна ширина 260px, можна рости */
  max-width: 260px;

  @media (max-width: 768px) {
    flex: 1 1 45%; /* 2 в ряд на планшетах */
    max-width: 45%;
  }

  @media (max-width: 480px) {
    flex: 1 1 100%; /* 1 в ряд на мобільних */
    max-width: 100%;
  }
`;

const ShowList = ({ shows }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder="Пошук вистав"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ShowListContainer>
        {filteredShows.map(show => (
          <ShowCardWrapper key={show.id}>
            <ShowCard show={show} />
          </ShowCardWrapper>
        ))}
      </ShowListContainer>
    </Wrapper>
  );
};

export default ShowList;
