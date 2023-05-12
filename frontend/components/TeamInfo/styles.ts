import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  picker: {
    flex: 1,
    zIndex: 10,
  },
  info: {
    flex: 9,
    backgroundColor: "white",
  },
  info_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

export const dropdownStyles = StyleSheet.create({
  dropdownLabel: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdownText: {
    fontSize: 18,
    textAlign: "center",
  },
});