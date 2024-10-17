import { createSlice } from "@reduxjs/toolkit";
 

const initialState = [];

const expenseList = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action ) => {
      state.push(action.payload);
    },

    setExpenses: (state, action ) => {
      if (action.payload) {
        return action.payload;
      }
    },
    updateExpense: (state, action ) => {
      const { uid, updatedExpense } = action.payload;
      const expenseIndex = state.findIndex((expense) => expense.uid === uid);
      if (expenseIndex !== -1) {
        state[expenseIndex] = { ...state[expenseIndex], ...updatedExpense };
      }
    },
    deleteExpense: (state, action) => {
      const uid = action.payload;
      return state.filter((expense) => expense.uid !== uid);
    },
  },
});

export const { addExpense, setExpenses, deleteExpense, updateExpense } = expenseList.actions;

// Export reducer
export default expenseList.reducer;
