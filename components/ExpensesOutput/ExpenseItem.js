import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ id, description, date, amount }) {
  const navigation = useNavigation();

  function expenseItemPressHandler() {
    navigation.navigate("ManageExpenses", { expenseId: id });
  }
  return (
    <Pressable
      onPress={expenseItemPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.ExpenseItem}>
        <View>
          <Text style={[styles.description, styles.textBase]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },

  ExpenseItem: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },

  textBase: {
    color: GlobalStyles.colors.primary50,
  },

  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },

  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
