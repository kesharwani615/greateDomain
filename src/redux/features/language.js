/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api.js';
import toast from "react-hot-toast";

export const languageSlice = createAsyncThunk('/language',async() => {
    try {
        const response = await api.language();
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const language_DeleteSlice = createAsyncThunk('/language/delete',async(name) => {
    try {
        const response = await api.languageDelete(name);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const language_CreateSlice = createAsyncThunk('/language/create',async(language_code) => {
    try {
        console.log(language_code);
        const response = await api.languageCreate(language_code);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const language_EditSlice = createAsyncThunk('/language/Edit',async({oldName,language_code}) => {
    try {
        console.log({oldName,language_code});
        const response = await api.languageEdit({oldName,language_code});
        return response.data;
    } catch (error) {
       throw error;    
    }
})

const languageSliceReducer = createSlice({
    name:'language',
    initialState:{
        language_Data:[],
        language_Create:[],
        language_Edit:[],
        language_delete:'',
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(languageSlice.pending,(state)=>{
            state.loading = true
        })
        .addCase(languageSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.language_Data = action.payload.data;
             toast.success('language fetched successfully!');
        })
        .addCase(languageSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('fetching failed language!');
        })
        .addCase(language_DeleteSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(language_DeleteSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.language_delete = action.payload;
             toast.success('language deleted successfully!');
        })
        .addCase(language_DeleteSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('deletaion failed language!');
        })
        .addCase(language_CreateSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(language_CreateSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.language_Create = action.payload;
             toast.success('language created successfully!');
        })
        .addCase(language_CreateSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('Editation failed language!');
        })
        .addCase(language_EditSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(language_EditSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.language_Edit = action.payload;
             toast.success('language Edited successfully!');
        })
        .addCase(language_EditSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('Editation failed language!');
        })
    }
})

export default languageSliceReducer.reducer;