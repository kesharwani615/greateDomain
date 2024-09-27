/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api.js';
import toast from "react-hot-toast";

export const currencySlice = createAsyncThunk('/currency',async() => {
    try {
        const response = await api.currency();
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const currency_DeleteSlice = createAsyncThunk('/currency/delete',async(id) => {
    try {
        const response = await api.currencyDelete(id);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const currency_CreateSlice = createAsyncThunk('/currency/create',async(currency_name) => {
    try {
        console.log(currency_name);
        const response = await api.currencyCreate(currency_name);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const currency_EditSlice = createAsyncThunk('/currency/Edit',async({editItemId,Currency_Edit}) => {
    try {
        console.log(editItemId,Currency_Edit);
        const response = await api.CurrencyEdit({editItemId,Currency_Edit});
        return response.data;
    } catch (error) {
       throw error;    
    }
})

const currencySliceReducer = createSlice({
    name:'currency',
    initialState:{
        currency_Data:[],
        currency_Create:[],
        currency_Edit:[],
        currency_delete:'',
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(currencySlice.pending,(state)=>{
            state.loading = true
        })
        .addCase(currencySlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.currency_Data = action.payload.data;
             toast.success('currency fetched successfully!');
        })
        .addCase(currencySlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('fetching failed currency!');
        })
        .addCase(currency_DeleteSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(currency_DeleteSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.currency_delete = action.payload;
             toast.success('currency deleted successfully!');
        })
        .addCase(currency_DeleteSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('deletaion failed currency!');
        })
        .addCase(currency_CreateSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(currency_CreateSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.currency_Create = action.payload;
             toast.success('currency deleted successfully!');
        })
        .addCase(currency_CreateSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('Editation failed currency!');
        })
        .addCase(currency_EditSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(currency_EditSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.currency_Edit = action.payload;
             toast.success('currency Edited successfully!');
        })
        .addCase(currency_EditSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('Editation failed currency!');
        })
    }
})

export default currencySliceReducer.reducer;