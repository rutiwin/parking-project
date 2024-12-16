import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store'; // Import AppDispatch from your store
import { toggleParkingStatus } from '../../redux/slices/parkingSlice';
import './Parking.css';

type SingleParkingProps = {
    id: number;
    streetName: string;
    isOccupied: boolean;
    onToggleStatus: (id: number, newStatus: boolean) => void;
};

const SingleParking: React.FC<SingleParkingProps> = ({ id, streetName, isOccupied, onToggleStatus }) => {
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch to type dispatch

    const handleToggle = () => {
        const newStatus = !isOccupied;
        dispatch(toggleParkingStatus({ id, isOccupied: newStatus }));
        onToggleStatus(id, newStatus);
    };

    return (
        <div className="card mb-3 parking-card">
            <div className="card-body">
                <h5 className="card-title">{streetName}</h5>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`flexSwitchCheck${id}`}
                        checked={isOccupied}
                        onChange={handleToggle}
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleParking;