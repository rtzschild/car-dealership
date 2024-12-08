import React, { useEffect, useState } from 'react';
import { getCars } from '../services/carService';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

const Home = () => {
    const [cars, setCars] = useState([]); // All cars fetched from the backend
    const [filteredCars, setFilteredCars] = useState([]); // Cars filtered by criteria
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [loading, setLoading] = useState(true);

    const carsPerPage = 16; // Number of cars displayed per page

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await getCars();
                setCars(data);
                setFilteredCars(data); // Initially set filtered cars to all cars
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleFilter = ({ minPrice, maxPrice, maxKms }) => {
        const filtered = cars.filter((car) =>
            car.price >= minPrice &&
            car.price <= maxPrice &&
            car.kms <= maxKms
        );
        setFilteredCars(filtered);
        setCurrentPage(1); // Reset to the first page after applying filters
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Pagination logic
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Car Listings</h1>
            <Filter onFilter={handleFilter} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {currentCars.map((car) => (
                    <div key={car._id} style={{ border: '1px solid #ccc', padding: '16px' }}>
                        <Link to={`/car/${car._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h3>{car.make} {car.model}</h3>
                            <p>Year: {car.year}</p>
                            <p>Price: ${car.price}</p>
                            <p>KMs: {car.kms}</p>
                            <img
                                src={car.images[0]}
                                alt={car.model}
                                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                            />
                        </Link>
                    </div>
                ))}
            </div>
            <Pagination
                totalCars={filteredCars.length}
                carsPerPage={carsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Home;
