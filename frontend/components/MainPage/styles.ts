import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  upper: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: width,
  },
  lower: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  background: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  title: {
    marginVertical: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
});
