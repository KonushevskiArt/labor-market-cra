import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IState {
  email: string | null
  token: string | null
  uid: string | null
  userName: string | null
}

const initialState: IState = {
  email: null,
  token: null,
  uid: null,
  userName: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser (state, action: PayloadAction<IState>) {
      state.email = action.payload.email
      state.token = action.payload.token
      state.uid = action.payload.uid
      state.userName = action.payload.userName
    },
    removeUser (state) {
      state.email = null
      state.token = null
      state.uid = null
      state.userName = null
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
