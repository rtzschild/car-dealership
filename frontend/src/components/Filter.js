import React from 'react';

const Filter = ({ onFilter }) => {
    const handleFilter = () => {
        const minPrice = parseInt(document.getElementById('minPrice').value, 10) || 0;
        const maxPrice = parseInt(document.getElementById('maxPrice').value, 10) || Infinity;
        const maxKms = parseInt(document.getElementById('maxKms').value, 10) || Infinity;

        onFilter({ minPrice, maxPrice, maxKms });
    };

    return (
        <div>
            <h2>Filter Cars</h2>
            <label>
                Min Price: <input id="minPrice" type="number" />
            </label>
            <label>
                Max Price: <input id="maxPrice" type="number" />
            </label>
            <label>
                Max KMs: <input id="maxKms" type="number" />
            </label>
            <button onClick={handleFilter}>Apply Filters</button>
        </div>
    );
};

export default Filter;
