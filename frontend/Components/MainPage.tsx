import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
} from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../App";

type MainPageNavigationProp = StackNavigationProp<RootStackParamList, "MainPage">;

interface MainProps {
    navigation: MainPageNavigationProp;
}

const { width } = Dimensions.get("window");

export default function MainPage({ navigation }: MainProps) {
  const navigate = (type: number) => {
    if (type === 1) {
      console.log("login");
    } else if (type === 2) {
      console.log("signup");
    } else if (type === 3) {
      console.log("home");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.jpg")}
        />
        <Text style={styles.title}>
          Open up App.tsx to start working on your app!
        </Text>
        <View style={styles.buttons}>
          <Button title="팀 정보" onPress={() => navigate(1)} />
          <Button title="일정/결과" onPress={() => navigate(2)} />
          <Button title="기록실" onPress={() => navigate(3)} />
        </View>
        <Button
          title="Testing Center"
          onPress={() => navigation.navigate("Testing")}
        />
      </View>
      <View style={styles.lower}>
        <Image
          style={styles.background}
          source={require("../assets/images/background.jpg")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  upper: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: width,
  },
  lower: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: "bold",
  },
});
