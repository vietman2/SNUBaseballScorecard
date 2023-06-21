import React from "react";
import { Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";
import { styles } from "./styles";

type ManagementNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Management"
>;

interface Props {
  navigation: ManagementNavigationProp;
}

export default function Management({ navigation }: Props) {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>대회 관리</Text>
      </View>
    </View>
  );
}
