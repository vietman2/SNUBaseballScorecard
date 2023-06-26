import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a202c",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    margin: 10,
  },
  button: {
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  
});

export const tableStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  boldText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  table: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
})