import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});

export const tableStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  topBox: {
    flexDirection: "row",
    marginVertical: 10
  },
  topColumn: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  otherBox: {
    flexDirection: "row",
    marginTop: 5
  },
  centerText: {
    textAlign: "center",
  },
});
