import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name:'',
    profilePic:'',
}

export const activateSlice = createSlice({
  name: 'activate',
  initialState,
  reducers: {
    setName: (state,action) => {
      state.name = action.payload;
      
    },
    setprofilePic: (state,action) =>{
      
      state.profilePic = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setName, setprofilePic } = activateSlice.actions

export default activateSlice.reducer