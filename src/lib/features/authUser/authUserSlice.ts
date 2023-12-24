import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
export interface IUserState {
  userAvatar:string|null;
  _id:string|null;
   username:string|null;
   email:string|null;
   iat?:number|null;
   exp?:number|null;
   
}
export interface IinitialState {
    user:IUserState
}

// Define the initial state using that type
const initialState:IinitialState = {
    user:{
    userAvatar:null,
  _id:null,
   username:null,
   email:null,
   
    }
}
export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser: (state,action) => {
        state.user = action.payload
    },
    
  }
})

export const { setAuthUser} = authUserSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectAuthUser = (state: RootState) => state.authUser.user
export default authUserSlice.reducer