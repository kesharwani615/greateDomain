/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api.js';
import toast from "react-hot-toast";

export const domainSlice = createAsyncThunk('/domain',async() => {
    try {
        const response = await api.domain();
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const domain_CreateSlice = createAsyncThunk('/domain/create',async(data) => {
    try {
        console.log(data);
        const response = await api.DomainCreate(data);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const domain_EditSlice = createAsyncThunk('/domain/Edit',async({id,EditDomainData}) => {
    try {
        console.log({id,EditDomainData});
        const response = await api.DomainEdit({id,EditDomainData});
        return response.data;
    } catch (error) {
       throw error;    
    }
})

const domainSliceReducer = createSlice({
    name:'extension',
    initialState:{
        domain_Data:[],
        domain_Create:[],
        domain_Edit:[],
        domain_delete:'',
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(domainSlice.pending,(state)=>{
            state.loading = true
        })
        .addCase(domainSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.domain_Data = action.payload.data;
             toast.success('domain fetched successfully!');
        })
        .addCase(domainSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('fetching failed domain!');
        })
        .addCase(domain_CreateSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(domain_CreateSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.domain_Create = action.payload;
             toast.success('domain create successfully!');
        })
        .addCase(domain_CreateSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('Editation failed domain!');
        })
        .addCase(domain_EditSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(domain_EditSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.domain_Edit = action.payload;
             toast.success('domain Edited successfully!');
        })
        .addCase(domain_EditSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             toast.error('Editation failed domain');
        })
    }
})

export default domainSliceReducer.reducer;