// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios";


// // eslint-disable-next-line no-unused-vars
// export const getMenu = createAsyncThunk("menu/getMenu", async (search) => {

//     // console.log(search, page, limit);

//     const payload = {
//         headers: {
//             access_token: localStorage.getItem("token_admin_binar")
//         }
//     }
//     try {
//         const response = await axios.get(`https://api-car-rental.binaracademy.org/admin/v2/car?name=${search}&page=1&pageSize=9`, payload)
//         console.log(response.data);
//         return response.data
//     } catch (error) {
//         return error.response.data
//     }
// })








// const menuSlice = createSlice({
//     name: 'menu',
//     initialState: {
//         menu: [],
//         loading: false,
//         error: null,
//         status: 'idle',
//         page: 1,
//         totalPages: 1,
//     },
//     reducers: {
//     setPage(state, action) {
//         state.page = action.payload;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getMenu.pending, (state) => {
//                 state.loading = true
//                 state.status = 'loading';
//             })
//             .addCase(getMenu.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.status = 'succeeded';
//                 state.menu = action.payload
//                 state.totalPages = action.payload.pageCount;
//             })
//             .addCase(getMenu.rejected, (state, action) => {
//                 state.loading = false
//                 state.status = 'failed';
//                 state.error = action.error.message
//             })
//     },
// })
// export const { setPage } = menuSlice.actions;

// export default menuSlice.reducer








import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle',
    currentPage: 1,
    totalPages: 0,
    searchTerm: '',
    capacity: '', // Default capacity
};

// Fetch data thunk
export const fetchData = createAsyncThunk('data/fetchData', async ({ searchTerm , page, capacity }) => {
    // console.log(searchTerm, page);
    const config = {
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc'
        }
    };
    const category = capacity === 'all' ? '' : capacity;
    const url = `https://api-car-rental.binaracademy.org/admin/v2/car?name=${searchTerm}&category=${category}&page=${page}&pageSize=9`;
    const response = await axios.get(url, config);

    // console.log(response.data);
    return response.data;
}
);

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setCapacity: (state, action) => {
            state.capacity = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.totalPages = action.payload.pageCount;
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { setPage, setSearchTerm, setCapacity  } = dataSlice.actions;

export default dataSlice.reducer;