import React, { useEffect } from 'react'; // Import React and useEffect
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { AppDispatch, RootState } from '../../redux/store'; // Import AppDispatch and RootState
import { fetchParkings } from '../../redux/slices/parkingSlice'; // Import fetchParkings action
import './Header.css';

// Define Props if needed or remove the generic type from React.FC
// If you don't have any props, you can omit <Props> and just use React.FC
// const Header: React.FC<Props> = () => {
const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Correctly type the dispatch with AppDispatch
    const parkings = useSelector((state: RootState) => state.parkingSlice.parkings || []);
    const loading = useSelector((state: RootState) => state.parkingSlice.loading);

    useEffect(() => {
        dispatch(fetchParkings({})); // Fetch all parkings on mount
    }, [dispatch]);

    const handleShowAll = () => {
        dispatch(fetchParkings({}));
    };

    const handleSearch = () => {
        const streetInput = (document.getElementById('streetsDataList') as HTMLInputElement).value;
        const statusSelect = (document.querySelector('.form-select') as HTMLSelectElement).value;

        const isOccupied = statusSelect === "occupied" ? true : statusSelect === "free" ? false : undefined;
        
        dispatch(fetchParkings({ street: streetInput, isOccupied }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const options = parkings.map((parking) => (
        <option key={`${parking.streetName}-${parking.id}`} value={parking.streetName} />
    ));

    return (
        <div className="header-container">
            <h1>Parking in Jerusalem</h1>
            <form id="searchForm" className="mb-4">
                <div className="input-group">
                    <div>
                        <input className="form-control long-input" list="datalistOptions" id="streetsDataList" placeholder="Type street to search..." />
                        <datalist id="datalistOptions">
                            {options}
                        </datalist>
                    </div>
                    <div>
                        <select className="form-select" aria-label="Default select status">
                            <option value="">All</option>
                            <option value="free">Free</option>
                            <option value="occupied">Occupied</option>
                        </select>
                    </div>
                    <div className="input-group-append">
                        <button type="button" id="searchBtn" className="btn btn-primary" onClick={handleSearch}>Search</button>
                        <button type="button" id="allBtn" className="btn btn-secondary" onClick={handleShowAll}>Show all parking spaces</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Header;