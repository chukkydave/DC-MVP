import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;
import { collection, addDoc, onSnapshot, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase"

export const fetchFirstTimers = createAsyncThunk('firstTimers/fetchFirstTimers', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'first-timers'));
        // const firstTimers = [];
        // querySnapshot.forEach((doc) => {
        //     firstTimers.push({ id: doc.id, ...doc.data() });
        // });
        // return firstTimers;
    } catch (error) {
        throw error;
    }
});

export const createFirstTimer = createAsyncThunk('firstTimers/createFirstTimer', async (firstTimerData) => {
    const response = await addDoc(collection(db, "first-timers"), firstTimerData);
    return response;
});

export const updateFirstTimer = createAsyncThunk('firstTimers/updateFirstTimer', async (firstTimerData) => {
    const response = await axios.patch(`${baseUrl}/appendQuestion/${firstTimerData.id}`, firstTimerData.dta, {
        headers: {
            Authorization: localStorage.getItem('authToken')
        }
    });
    return response.data;
});

export const deleteFirstTimer = createAsyncThunk('firstTimers/deleteFirstTimer', async (firstTimerId) => {
    await axios.delete(`${baseUrl}/deleteFirstTimer/${firstTimerId}`, {
        headers: {
            Authorization: localStorage.getItem('authToken')
        }
    });
    return firstTimerId;
});

export const firstTimersSlice = createSlice({
    name: 'firstTimers',
    initialState: {
        firstTimers: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFirstTimers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFirstTimers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.firstTimers = action.payload;
            })
            .addCase(fetchFirstTimers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createFirstTimer.fulfilled, (state, action) => {
                state.firstTimers.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(createFirstTimer.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createFirstTimer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateFirstTimer.fulfilled, (state, action) => {
                // const { id } = action.payload;
                // const existingFirstTimer = state.firstTimers.find(firstTimer => firstTimer.id === id);
                // if (existingFirstTimer) {
                //     Object.assign(existingFirstTimer, action.payload);
                // }
            })
            .addCase(deleteFirstTimer.fulfilled, (state, action) => {
                const index = state.firstTimers.findIndex(firstTimer => firstTimer._id === action.payload);
                if (index !== -1) {
                    state.firstTimers.splice(index, 1);
                }
            });
    }
});

export const selectAllFirstTimers = state => state.firstTimers.firstTimers;
export const selectFirstTimerById = (state, firstTimerId) => state.firstTimers.firstTimers.find(firstTimer => firstTimer.id === firstTimerId);

export default firstTimersSlice.reducer;