import {
  Text,
  View,
  Image,
  Button,
} from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";
import { styles } from "./styles";

type MainPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainPage"
>;

interface MainProps {
  navigation: MainPageNavigationProp;
}

export default function MainPage({ navigation }: MainProps) {
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.jpg")}
        />
        <Text style={styles.title}>
          {/*TODO: FIXME*/ }
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
          source={require("../../assets/images/background.jpg")}
        />
      </View>
    </View>
  );
}

