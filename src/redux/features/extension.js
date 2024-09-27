/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api.js';
import toast from "react-hot-toast";

export const extensionSlice = createAsyncThunk('/extension',async() => {
    try {
        const response = await api.Extension();
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const extension_DeleteSlice = createAsyncThunk('/extension/delete',async(id) => {
    try {
        const response = await api.ExtensionDelete(id);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const extension_CreateSlice = createAsyncThunk('/extension/create',async(extension_name) => {
    try {
        console.log(extension_name);
        const response = await api.ExtensionCreate(extension_name);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const extension_EditSlice = createAsyncThunk('/extension/Edit',async({editItemId,extension_Edit}) => {
    try {
        console.log(editItemId,extension_Edit);
        const response = await api.ExtensionEdit({editItemId,extension_Edit});
        return response.data;
    } catch (error) {
       throw error;    
    }
})

const extensionSliceReducer = createSlice({
    name:'extension',
    initialState:{
        extension_Data:[],
        extension_Create:[],
        extension_Edit:[],
        extension_delete:'',
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(extensionSlice.pending,(state)=>{
            state.loading = true
        })
        .addCase(extensionSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.extension_Data = action.payload.data;
             toast.success('Extension fetched successfully!');
        })
        .addCase(extensionSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('fetching failed extension!');
        })
        .addCase(extension_DeleteSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(extension_DeleteSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.extension_delete = action.payload;
             toast.success('Extension deleted successfully!');
        })
        .addCase(extension_DeleteSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('deletaion failed extension!');
        })
        .addCase(extension_CreateSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(extension_CreateSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.extension_Create = action.payload;
             toast.success('Extension deleted successfully!');
        })
        .addCase(extension_CreateSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('Editation failed extension!');
        })
        .addCase(extension_EditSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(extension_EditSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.extension_Edit = action.payload;
             toast.success('Extension Edited successfully!');
        })
        .addCase(extension_EditSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('Editation failed extension!');
        })
    }
})

export default extensionSliceReducer.reducer;