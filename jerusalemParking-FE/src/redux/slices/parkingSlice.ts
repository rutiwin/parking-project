import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getParking, changeParkingStatus } from '../../client/parkingApi';

interface ParkingModel {
    id: number;
    streetName: string;
    isOccupied: boolean;
}

interface ParkingState {
    parkings: ParkingModel[];
    loading: boolean;
}

const initialState: ParkingState = {
    parkings: [],
    loading: false,
};

export const fetchParkings = createAsyncThunk(
    'parkings/fetchParkings',
    async ({ street, isOccupied }: { street?: string, isOccupied?: boolean }, { rejectWithValue }) => {
        try {            
            const response = await getParking(street, isOccupied);            
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const toggleParkingStatus = createAsyncThunk(
    'parkings/toggleStatus',
    async ({ id, isOccupied }: { id: number, isOccupied: boolean }, { rejectWithValue }) => {
        try {
            await changeParkingStatus(id, isOccupied);
            return { id, isOccupied };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const parkingSlice = createSlice({
    name: 'parkings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchParkings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchParkings.fulfilled, (state, action) => {
                state.parkings = action.payload;
                state.loading = false;
            })
            .addCase(fetchParkings.rejected, (state) => {
                state.loading = false;
            })
            .addCase(toggleParkingStatus.fulfilled, (state, action) => {
                const { id, isOccupied } = action.payload;
                const parking = state.parkings.find(p => p.id === id);
                if (parking) {
                    parking.isOccupied = isOccupied;
                }
            })
            .addCase(toggleParkingStatus.rejected, (state, action) => {
                console.error('Failed to update parking status:', action.payload);
            });
    }
});

export default parkingSlice.reducer;
