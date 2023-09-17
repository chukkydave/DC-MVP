import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchSecondTimers = createAsyncThunk('secondTimers/fetchSecondTimers', async () => {
    const response = await axios.get(`${baseUrl}/fetchSecondTimers`, { headers: { Authorization: localStorage.getItem('authToken') } });
    return response.data.data;
});

export const createSecondTimer = createAsyncThunk('secondTimers/createSecondTimer', async (secondTimerData) => {
    const response = await axios.post(`${baseUrl}/createSecondTimer`, secondTimerData, {
        headers: {
            Authorization: localStorage.getItem('authToken')
        }
    });
    return response.data.data;
});

export const updateSecondTimer = createAsyncThunk('secondTimers/updateSecondTimer', async (secondTimerData) => {
    const response = await axios.patch(`${baseUrl}/appendQuestion/${secondTimerData.id}`, secondTimerData.dta, {
        headers: {
            Authorization: localStorage.getItem('authToken')
        }
    });
    return response.data;
});

export const deleteSecondTimer = createAsyncThunk('secondTimers/deleteSecondTimer', async (secondTimerId) => {
    await axios.delete(`${baseUrl}/deleteSecondTimer/${secondTimerId}`, {
        headers: {
            Authorization: localStorage.getItem('authToken')
        }
    });
    return secondTimerId;
});

export const secondTimersSlice = createSlice({
    name: 'secondTimers',
    initialState: {
        secondTimers: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSecondTimers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSecondTimers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.secondTimers = action.payload;
            })
            .addCase(fetchSecondTimers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createSecondTimer.fulfilled, (state, action) => {
                state.secondTimers.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(createSecondTimer.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createSecondTimer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateSecondTimer.fulfilled, (state, action) => {
                // const { id } = action.payload;
                // const existingSecondTimer = state.secondTimers.find(secondTimer => secondTimer.id === id);
                // if (existingSecondTimer) {
                //     Object.assign(existingSecondTimer, action.payload);
                // }
            })
            .addCase(deleteSecondTimer.fulfilled, (state, action) => {
                const index = state.secondTimers.findIndex(secondTimer => secondTimer._id === action.payload);
                if (index !== -1) {
                    state.secondTimers.splice(index, 1);
                }
            });
    }
});

export const selectAllSecondTimers = state => state.secondTimers.secondTimers;
export const selectSecondTimerById = (state, secondTimerId) => state.secondTimers.secondTimers.find(secondTimer => secondTimer.id === secondTimerId);

export default secondTimersSlice.reducer;