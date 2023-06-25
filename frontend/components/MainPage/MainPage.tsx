import {
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "react-native-paper";

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
        <Text style={styles.title}>서울대학교 교내 야구대회</Text>
        <View style={styles.buttons}>
          <Button
            mode="contained-tonal"
            onPress={() => navigation.navigate("TeamInfo")}
            textColor="#0f0f70"
          >
            팀 정보
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => navigation.navigate("Schedule")}
            textColor="#0f0f70"
          >
            일정/결과
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => navigation.navigate("Records")}
            textColor="#0f0f70"
          >
            기록실
          </Button>
          {/* Temporary */}
          <Button
            mode="contained-tonal"
            onPress={() => navigation.navigate("Management")}
            textColor="#0f0f70"
          >
            대회 관리
          </Button>
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

