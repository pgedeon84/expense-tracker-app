import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // if working with dummy-data, Build an Id to attach to new expenses
      // const id = new Date().toString() + Math.random().toString();
      // return [{ ...action.payload, id: id }, ...state];
      return [action.payload, ...state];

    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

    case "UPDATE":
      // Find the item by index (istead of by id) of the item USING the incoming id
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      // Pull the seleted item from the state array and store it in a new var
      const updatableExpense = state[updatableExpenseIndex];

      // Build an updated expense item
      const updatedExpenseObj = { ...updatableExpense, ...action.payload.data };

      // Build the overall array that should be updated
      const updatedExpenses = [...state];

      // Access the updatableExpense with the index and override/merge the updated expense
      updatedExpenses[updatableExpenseIndex] = updatedExpenseObj;
      return updatedExpenses;

    case "DELETE":
      // Use incoming id to filter out the deleted expense
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}
function ExpenseContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
