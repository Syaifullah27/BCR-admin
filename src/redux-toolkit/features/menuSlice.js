import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
// import { Searchcars } from "../../context/searchCars";
// import { useContext } from "react";




// eslint-disable-next-line no-unused-vars
export const getMenu = createAsyncThunk("menu/getMenu", async (search) => {

    // console.log('search', search);
    // console.log(page);
    // const { search, setSearch } = useContext(Searchcars)
    // console.log('searchCar', search);
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



const initialState = {
    menu: [],
    loading: false,
    error: null,
    pagination: {
        page: 1,
        pageSize: 10,
        count: 0,
        
    }
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

