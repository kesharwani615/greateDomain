/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api.js';
import toast from "react-hot-toast";

export const CategorySlice = createAsyncThunk('/category',async() => {
    try {
        const response = await api.Category();
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const Category_DeleteSlice = createAsyncThunk('/category/delete',async(id) => {
    try {
        const response = await api.CategoryDelete(id);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const Category_CreateSlice = createAsyncThunk('/category/create',async({fileData,category_name}) => {
    try {
        console.log({fileData,category_name});
        const response = await api.CategoryCreate({fileData,category_name});
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const Category_EditSlice = createAsyncThunk('/category/Edit',async({editItemId,fileData,category_Edit}) => {
    try {
        console.log({editItemId,fileData,category_Edit});
        const response = await api.CategoryEdit({editItemId,fileData,category_Edit});
        return response.data;
    } catch (error) {
       throw error;    
    }
})

const categorySliceReducer = createSlice({
    name:'extension',
    initialState:{
        category_Data:[],
        category_Create:[],
        category_Edit:[],
        category_delete:'',
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(CategorySlice.pending,(state)=>{
            state.loading = true
        })
        .addCase(CategorySlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.category_Data = action.payload.data;
             toast.success('Category fetched successfully!');
        })
        .addCase(CategorySlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('fetching failed Category!');
        })
        .addCase(Category_DeleteSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(Category_DeleteSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.category_delete = action.payload;
             toast.success('Extension deleted successfully!');
        })
        .addCase(Category_DeleteSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('deletaion failed extension!');
        })
        .addCase(Category_CreateSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(Category_CreateSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.category_Create = action.payload;
             toast.success('Extension deleted successfully!');
        })
        .addCase(Category_CreateSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('Editation failed extension!');
        })
        .addCase(Category_EditSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(Category_EditSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.category_Edit = action.payload;
             toast.success('Extension Edited successfully!');
        })
        .addCase(Category_EditSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('Editation failed extension!');
        })
    }
})

export default categorySliceReducer.reducer;