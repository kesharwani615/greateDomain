/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api.js';
import toast from "react-hot-toast";

export const loginSlice = createAsyncThunk('/user/login',async(data) => {
     try {
        const response = await api.loginUser(data);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const logoutSlice = createAsyncThunk('user/logout',async() => {
    try {
        const response = await api.logoutUser();
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const AllUserSlice = createAsyncThunk('/all/users',async() => {
    try {
        const response = await api.AllUser();
        console.log("response:",response.data);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

export const DeleteUserSlice = createAsyncThunk('/delete/users',async(id) => {
    try {
        const response = await api.DeletUser(id);
        console.log("response:",response.data);
        return response.data;
    } catch (error) {
       throw error;    
    }
})

const authSlice = createSlice({
    name:'auth_user',
    initialState:{
        userLogin:[],
        AllUser:[],
        deleteUser:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(loginSlice.pending,(state)=>{
            state.loading = true
        })
        .addCase(loginSlice.fulfilled,(state,action)=>{
             state.loading = false,
             console.log(action.payload);
             state.userLogin.push(action.payload),
            //  {user_id,first_name,last_name,email_id,phone_number,street_address,city} = action.payload.data;
             localStorage.setItem('token',JSON.stringify(action.payload?.data?.token));
             localStorage.setItem('user_info',JSON.stringify(action.payload?.data));
             toast.success('Login successfully!');
        })
        .addCase(loginSlice.rejected,(state,action)=>{ 
             state.loading = false,
             state.error = action.error;
             toast.error('Login failed!');
        })
        .addCase(logoutSlice.pending,(state)=>{
            state.loading = true
        })
        .addCase(logoutSlice.fulfilled,(state,action)=>{
             state.loading = false,
             console.log(action.payload);
             state.userLogin = [],
             localStorage.removeItem('token');
             toast.success('Logout successfully!');
        })
        .addCase(logoutSlice.rejected,(state,action)=>{
             state.loading = false,
             state.error = action.error;
             console.log("error:",action.error)
             toast.error('Logout failed!');
        })
        .addCase(AllUserSlice.pending,(state)=>{
            state.loading = true
        })
        .addCase(AllUserSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.AllUser = action.payload.data;
             toast.success('User fetched successfully!')
        })
        .addCase(AllUserSlice.rejected,(state,action)=>{
             state.loading = false,
             console.log(action.error)
             state.error = action.error;
        })
        .addCase(DeleteUserSlice.pending,(state)=>{
            // state.loading = true
        })
        .addCase(DeleteUserSlice.fulfilled,(state,action)=>{
             state.loading = false,
             state.deleteUser = action.payload.data;
             toast.success('User deleted Successfully!')
        })
        .addCase(DeleteUserSlice.rejected,(state,action)=>{
             state.loading = false,
             console.log(action.error)
             state.error = action.error;
             toast.error('deletion failed!');

        })
    }
})

export default authSlice.reducer;