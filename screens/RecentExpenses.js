import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const expenseCtx = useContext(ExpenseContext);

  useEffect(() => {
    // created helper function called "getExpenses()" inside of useEffect because fetchExpenses return a promise
    // and can only be called by another async function. useEffect cannot be converted into an async
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not connect to server");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  const recentExpense = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  function confirmErrorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={confirmErrorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpense}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({});
