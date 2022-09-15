import { createContext, useReducer } from "react";

const DUMMY_DATA = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 119.99,
    date: new Date("2022-09-09"),
  },
  {
    id: "e2",
    description: "A pair of jeans",
    amount: 79.99,
    date: new Date("2022-08-14"),
  },
  {
    id: "e3",
    description: "A coffee table",
    amount: 18.99,
    date: new Date("2022-09-11"),
  },
  {
    id: "e4",
    description: "A laptop",
    amount: 429.99,
    date: new Date("2021-08-31"),
  },
  {
    id: "e5",
    description: "A pack of socks",
    amount: 20.99,
    date: new Date("2022-09-12"),
  },
  {
    id: "e6",
    description: "A pair of Jeans",
    amount: 79.99,
    date: new Date("2022-09-08"),
  },
  {
    id: "e7",
    description: "A book",
    amount: 18.99,
    date: new Date("2022-07-18"),
  },
  {
    id: "e8",
    description: "A laptop",
    amount: 429.99,
    date: new Date("2022-08-25"),
  },
  {
    id: "e9",
    description: "A pair of Scissors",
    amount: 119.99,
    date: new Date("2022-09-10"),
  },
  {
    id: "e10",
    description: "A pair of jeans",
    amount: 79.99,
    date: new Date("2021-07-14"),
  },
  {
    id: "e11",
    description: "A book",
    amount: 18.99,
    date: new Date("2022-08-11"),
  },
  {
    id: "e12",
    description: "A laptop",
    amount: 429.99,
    date: new Date("2022-06-20"),
  },
];

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // Build an Id to attach to new expenses
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_DATA);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
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
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
