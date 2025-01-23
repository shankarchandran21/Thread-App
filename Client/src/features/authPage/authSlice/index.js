import { createSlice } from "@reduxjs/toolkit";


const initialState = JSON.parse(localStorage.getItem("user-threads"))?JSON.parse(localStorage.getItem("user-threads")):{
    _id:"",
    name:"",
    email:"",
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userAuth:(state,{payload})=>{
            state._id = payload._id;
            state.name = payload.name;
            state.email = payload.email;

        }
    }
})

export const {userAuth} = authSlice.actions
export default authSlice.reducer