import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {isParticipantLoggedIn: false, token:'', employeeId: '', userData:{}}

const authSlice = createSlice({
    name: 'tokenmgt',
    initialState,
    reducers:{
        saveUserLogInData(state, action){
            state.token = action.payload.token
            state.employeeId = action.payload.employeeId
            state.isParticipantLoggedIn = !!action.payload.token && !!action.payload.employeeId
        },
        saveUserData(state, action){
            state.userData = action.payload
        },
        logout(){}
    }
})

// createSlice({
//     name: 'authmgt',
//     initialState,
//     reducers:{
//         logout(){}
//     }
// })


const store = configureStore({
    reducer: {
        tokenmgt: authSlice.reducer, // Ensure the key matches your reducer slice name
    }

})

export const logReduxState = () => {
    return (dispatch, getState) => {
      const currentState = getState(); // Get the current Redux state
      console.log('Redux State:', currentState);
    };
  };

export const tokenMgtActions = authSlice.actions

export default store