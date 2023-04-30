import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    backgroundColor: "#fff",
  },
  groups_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  type: {
    flexDirection: "row",
  },
  type_view_selected: {
    flex: 1,
    backgroundColor: "grey",
    borderRadius: 40,
  },
  type_text_selected: {
    textAlign: "center",
    fontWeight: "bold",
  },
  type_view: {
    flex: 1,
  },
  type_text: {
    textAlign: "center",
  },
});

const dropdownStyles = StyleSheet.create({
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

export { styles, dropdownStyles };