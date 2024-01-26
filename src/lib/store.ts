import { configureStore } from '@reduxjs/toolkit'
import authUserSlice from './features/authUser/authUserSlice'
import allContactsSlice from './features/allContacts/allContactsSlice'



export const makeStore = () => {
  return configureStore({
    reducer: {
      authUser: authUserSlice,
      allContacts:allContactsSlice
    }

  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']