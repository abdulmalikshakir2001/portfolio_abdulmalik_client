import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
// Define a type for the slice state
// export interface IallContacts {
//     _id: string | null;
//     name: string | null;
//     email: string | null;
//     message: string | null;
//     createdAt: string | null;
//     updatedAt: string | null;
//     __v: number | null;
//   }
export interface IinitialState {
    // allContacts:IallContacts[]
    contentUpdated:boolean
}

// Define the initial state using that type
const initialState:IinitialState = {
    // allContacts:[{_id:null,name:null,email:null,message:null,createdAt:null,updatedAt:null,__v:null}]
    contentUpdated:false
}
export const allContactsSlice = createSlice({
  name: 'allContacts',
  initialState,
  reducers: {
    setContentUpdated: (state,action) => {
        state.contentUpdated = action.payload
    },
    
  }
})

export const { setContentUpdated} = allContactsSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectAllContacts = (state: RootState) => state.allContacts.contentUpdated
export default allContactsSlice.reducer