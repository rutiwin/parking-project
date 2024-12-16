import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store'; // Import AppDispatch
import { fetchParkings, toggleParkingStatus } from '../../redux/slices/parkingSlice';
import SingleParking from './SingleParking';
import './Parking.css';

const AllParking: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch to type dispatch
    const parkings = useSelector((state: RootState) => state.parkingSlice.parkings);
    const loading = useSelector((state: RootState) => state.parkingSlice.loading);

    useEffect(() => {
        dispatch(fetchParkings({}));
    }, [dispatch]);

    const handleToggleStatus = (id: number, newStatus: boolean) => {
        dispatch(toggleParkingStatus({ id, isOccupied: newStatus }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="parking-container">
            {parkings.map((lot) => (
                <SingleParking
                    key={lot.id}
                    id={lot.id}
                    streetName={lot.streetName}
                    isOccupied={lot.isOccupied}
                    onToggleStatus={handleToggleStatus}
                />
            ))}
        </div>
    );
};

export default AllParking;