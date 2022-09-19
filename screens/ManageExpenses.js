import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import { ExpenseContext } from "../store/expense-context";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpenseContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [expenseId, navigation]);

  async function expenseDeletePressHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Unable to delete expense - please try again later");
      setIsSubmitting(false);
    }
  }

  async function confirmPressHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
        navigation.goBack();
      }
    } catch (error) {
      setError("Unable to save expense - please try again later");
      setIsSubmitting(false);
    }
  }

  function cancelEditPressHandler() {
    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  function errorConfirmHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorConfirmHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelEditPressHandler}
        onSubmit={confirmPressHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={expenseDeletePressHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
