import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


export const getMenu = createAsyncThunk("menu/getMenu", async (searchCar, page) => {
    const payload = {
        headers: {
            access_token: localStorage.getItem("token_admin_binar")
        }
    }
    try {
        const response = await axios.get(`https://api-car-rental.binaracademy.org/admin/v2/car?name=${searchCar}&page=1&pageSize=9`, payload)
        console.log('response', response.data.cars);
        return response.data.cars
    } catch (error) {
        return error.response.data
    }
})



const initialState = {
    menu: [],
    loading: false,
    error: null
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMenu.pending, (state) => {
                state.loading = true
            })
            .addCase(getMenu.fulfilled, (state, action) => {
                state.loading = false
                state.menu = action.payload
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export default menuSlice.reducer

