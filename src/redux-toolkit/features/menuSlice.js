import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


// eslint-disable-next-line no-unused-vars
export const getMenu = createAsyncThunk("menu/getMenu", async (search) => {

    // console.log(search, page, limit);

    const payload = {
        headers: {
            access_token: localStorage.getItem("token_admin_binar")
        }
    }
    try {
        const response = await axios.get(`https://api-car-rental.binaracademy.org/admin/v2/car?name=${search}&page=1&pageSize=9`, payload)
        console.log(response.data);
        return response.data
    } catch (error) {
        return error.response.data
    }
})








const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: [],
        loading: false,
        error: null,
        status: 'idle',
        page: 1,
        totalPages: 1,
    },
    reducers: {
    setPage(state, action) {
        state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMenu.pending, (state) => {
                state.loading = true
                state.status = 'loading';
            })
            .addCase(getMenu.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded';
                state.menu = action.payload
                state.totalPages = action.payload.pageCount;
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed';
                state.error = action.error.message
            })
    },
})
export const { setPage } = menuSlice.actions;

export default menuSlice.reducer

