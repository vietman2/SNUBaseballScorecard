import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  middle: {
    flex: 1,
    zIndex: 1,
  },
  lower: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    marginLeft: 60,
  },
  title: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  inputs: {
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#000",
  },
});

export const buttonStyles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 60,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const imageStyles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  logo: {
    width: 180,
    height: 180,
  },
});

export { styles, imageStyles };