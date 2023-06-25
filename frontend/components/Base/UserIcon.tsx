import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Menu, Button } from "react-native-paper";

import { useAuth } from "../AuthProvider/AuthProvider";

import { RootStackParamList } from "../../App";

export default function UserIcon() {
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const changePassword = () => {
    // TODO
  };

  const userManagement = () => {
    // TODO
  };

  const tournamentManagement = () => {
    // TODO
  };

  const logout = () => {
    // TODO
  };

  if (user) {
    return (
      <View>
        <Menu
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          anchor={
            <Button
              icon="account"
              contentStyle={{ flexDirection: "row-reverse", marginEnd: 10 }}
              labelStyle={{ fontWeight: "bold" }}
              onPress={() => setIsMenuVisible(true)}
              theme={{ colors: { primary: "#000000" } }}
            >
              유저이름
            </Button>
          }
        >
          <Menu.Item onPress={() => changePassword()} title="비밀번호 변경" />
          {/* 아래 2개는 관리자일 경우에만 보이도록 */}
          <Menu.Item onPress={() => userManagement()} title="유저/심판관리" />
          <Menu.Item onPress={() => tournamentManagement()} title="대회관리" />
          <Menu.Item onPress={() => logout()} title="로그아웃" />
        </Menu>
      </View>
    );
  } else {
    return (
      <View>
        <Button
          icon="account"
          contentStyle={{ flexDirection: "row-reverse", marginEnd: 10 }}
          labelStyle={{ fontWeight: "bold" }}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          theme={{ colors: { primary: "#000000" } }}
        >
          로그인
        </Button>
      </View>
    );
  }
}
