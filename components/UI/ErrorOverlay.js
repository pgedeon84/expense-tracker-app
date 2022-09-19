import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.textBase, styles.title]}>An Error has occured!</Text>
      <Text style={styles.textBase}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },

  textBase: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
