import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authenticated :false,
    user:null,
    otp:{
      phone:"",
      otpHash:"",
    }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state,action) => {
      const {user} = action.payload;
      state.user = user;
      state.authenticated = true;
    },
    setOtp: (state,action) =>{
      const {phone,otpHash} = action.payload;
      state.otp = {phone,otpHash}
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuth, setOtp } = authSlice.actions

export default authSlice.reducer