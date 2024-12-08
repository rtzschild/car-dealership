import React from 'react';

const Pagination = ({ totalCars, carsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalCars / carsPerPage);

    if (totalPages <= 1) return null; // Don't show pagination if only one page

    return (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    style={{
                        margin: '0 5px',
                        padding: '10px',
                        backgroundColor: currentPage === index + 1 ? '#007bff' : '#fff',
                        color: currentPage === index + 1 ? '#fff' : '#000',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                    }}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
