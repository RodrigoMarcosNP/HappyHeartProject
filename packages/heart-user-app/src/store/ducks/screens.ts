import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const UserTypes = {
  ADD_CURRENT_SCREEN: 'screens/addCurrentScreen',
  BACK_SCREEN: 'screens/backScreen',
};

export interface Screen {
  screenStack: string
}

interface UserState {
  screenStack: Screen[],
}

const initialState: UserState = {
  screenStack: [{screenStack: 'Authentication'}]
}

const userSlice = createSlice({
  name: 'screens',
  initialState,
  reducers: {
    addCurrentScreen: (state, action: PayloadAction<Screen>) => {
      if(action.type == UserTypes.ADD_CURRENT_SCREEN) {
        state.screenStack.push(action.payload);
      }
    },
    backScreen: (state) => {
      state.screenStack.pop(); 
    },
  },
});

export const getCurrentScreen = (state: UserState, substractIndex: number) => {
  console.log(state.screenStack)
  const screenReturned = state.screenStack[state.screenStack.length - substractIndex];
  return screenReturned;
}

export const { 
  addCurrentScreen, 
  backScreen 
} = userSlice.actions;

export default userSlice.reducer;
