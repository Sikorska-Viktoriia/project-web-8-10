// ShowList.jsx
import React from 'react';
import ShowCard from './ShowCard';
import {
  ShowGrid,
  PaginationContainer,
  PaginationButton
} from "../pages/Home.styles";

const ShowList = ({ shows, currentPage, totalPages, onPageChange, onBook }) => {
  return (
    <>
      <ShowGrid>
        {shows.map(show => (
          <ShowCard key={show.id} show={show} onBook={onBook} />
        ))}
      </ShowGrid>

      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationButton
            key={index}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}
            active={currentPage === index + 1}
          >
            {index + 1}
          </PaginationButton>
        ))}
      </PaginationContainer>
    </>
  );
};

export default ShowList;
