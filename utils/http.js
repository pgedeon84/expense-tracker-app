import axios from "axios";

const BACKEND_URL =
  "https://rn-expenses-tracker-1027f-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const id = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
  return id;
}

export async function fetchExpenses() {
  const responses = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = []; // store returned data in an array

  // loop through all the data and transform it to resemble what is needed by the frontend and push it onto the array
  for (const key in responses.data) {
    const expenseObj = {
      id: key,
      amount: responses.data[key].amount,
      date: new Date(responses.data[key].date),
      description: responses.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
