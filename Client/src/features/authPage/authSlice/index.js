import { createSlice } from "@reduxjs/toolkit";


const savedThreads = JSON.parse(localStorage.getItem("user-threads"));
const initialState = savedThreads || {
    _id:"",
    name:"",
    email:"",
    userName:"",
    profilePic:"",
    followers:[],
    following:[],
    bio:""
};
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userAuth:(state,{payload})=>{
            state._id = payload._id;
            state.name = payload.name;
            state.email = payload.email;
            state.userName = payload.userName
            state.bio = payload.bio
            state.profilePic = payload.profilePic
            state.followers = payload.followers
            state.following = payload.following
            localStorage.setItem("user-threads", JSON.stringify(state));
        },
        logoutUserAuth:(state)=>{
           state._id="",
           state.name="",
           state.email="",
           state.userName="",
           state.profilePic="",
           state.followers=[],
           state.following=[],
           state.bio=""
            localStorage.removeItem("user-threads")
        }
    }
})

export const {userAuth,logoutUserAuth} = authSlice.actions
export default authSlice.reducer