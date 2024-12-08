import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/carService';
import { useNavigate } from 'react-router-dom';

const Details = () => {
    const { id } = useParams(); // Get the car ID from the URL
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const data = await getCarById(id);
                setCar(data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!car) return <p>Car not found</p>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h1>{car.make} {car.model}</h1>
            <img
                src={car.images[0]}
                alt={car.model}
                style={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: '20px' }}
            />
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Price:</strong> ${car.price}</p>
            <p><strong>KMs:</strong> {car.kms}</p>
            <p><strong>VIN:</strong> {car.vin}</p>
            <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
                {car.images.slice(1).map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Car ${index + 2}`}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                ))}
            </div>
        </div>

        
    );
    
    const navigate = useNavigate();
    <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>
        Back to Listings
    </button>
};

export default Details;
