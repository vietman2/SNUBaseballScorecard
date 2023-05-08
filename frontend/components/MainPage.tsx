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
import { Menu } from "react-native-paper";
import UserIcon from "react-native-vector-icons/FontAwesome5";

import { RootStackParamList } from "../App";

type MainPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainPage"
>;

interface MainProps {
  navigation: MainPageNavigationProp;
}

const { width } = Dimensions.get("window");

export default function MainPage({ navigation }: MainProps) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        style={styles.menu}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <UserIcon
            name="user"
            size={22}
            style={{ paddingEnd: 15 }}
            onPress={openMenu}
          />
        }
        anchorPosition="bottom"
      >
        <Menu.Item
          onPress={() => navigation.navigate("Login")}
          title="로그인"
        />
        <Menu.Item
          onPress={() => navigation.navigate("Register")}
          title="회원가입"
        />
      </Menu>
      <View style={styles.upper}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.jpg")}
        />
        <Text style={styles.title}>
          Open up App.tsx to start working on your app!
        </Text>
        <View style={styles.buttons}>
          <Button
            title="팀 정보"
            onPress={() => navigation.navigate("TeamInfo")}
          />
          <Button
            title="일정/결과"
            onPress={() => navigation.navigate("Schedule")}
          />
          <Button
            title="기록실"
            onPress={() => navigation.navigate("Records")}
          />
        </View>
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
  menu: {
    position: "absolute",
    top: 0,
    right: 1,
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
