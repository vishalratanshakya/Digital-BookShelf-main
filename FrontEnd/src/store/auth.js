import { createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false, role: "user"},
    reducers: { //everything below here are NOT FUNCTIONS but actually are REDUCERS 
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false;
        },
        changeRole(state,action) { //action here will helps us to get data from back while the reducers will help to get the daTA TO the front ednd
            const role = action.payload;
            state.role = role;
        },
    },
});

export const authActions = authSlice.actions;
export default  authSlice.reducer