import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../../../interface";

interface UpdateExpensePayload {
  uid: string;
  updatedExpense: Partial<Expense>;
}

const initialState: Expense[] = [];

const expenseList = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.push(action.payload);
    },

    setExpenses: (state, action: PayloadAction<Expense[] | null>) => {
      if (action.payload) {
        return action.payload;
      }
    },
    updateExpense: (state, action: PayloadAction<UpdateExpensePayload>) => {
      const { uid, updatedExpense } = action.payload;
      const expenseIndex = state.findIndex((expense) => expense.uid === uid);
      if (expenseIndex !== -1) {
        state[expenseIndex] = { ...state[expenseIndex], ...updatedExpense };
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const uid = action.payload;
      return state.filter((expense) => expense.uid !== uid);
    },
  },
});

export const { addExpense, setExpenses, deleteExpense, updateExpense } = expenseList.actions;

// Export reducer
export default expenseList.reducer;
