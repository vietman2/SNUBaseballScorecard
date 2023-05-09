import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import "react-native-gesture-handler";
import { Provider } from "react-native-paper";
import { View, TouchableOpacity, Text } from "react-native";

import { AuthProvider, useAuth } from "./components/AuthProvider/AuthProvider";
import MainPage from "./components/MainPage";
import TeamInfo from "./components/TeamInfo/TeamInfo";
import Schedule from "./components/ScheduleResults/ScheduleResults";
import Records from "./components/Records/Records";
import Registration from "./components/Registration/Registration";
import SignIn from "./components/SignIn/SignIn";
import Icon from "react-native-vector-icons/FontAwesome5";

export type RootStackParamList = {
  MainPage: undefined;
  TeamInfo: undefined;
  Schedule: undefined;
  Records: undefined;
  Registration: undefined;
  SignIn: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const UserIcon = () => {
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  if (user) {
    return (
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row", marginEnd: 16, marginTop: 4 }}
          onPress={() => {
            //TODO: Menu 컴포넌트
            // 1. 비번 등 유저정보 변경
            // 2. 관리자라면, 유저관리
            // 3. 심판정보
            // 4. 로그아웃
            navigation.navigate("SignIn");
          }}
        >
          <Icon name="user" size={24} />
          <Text>{"FIXME:유저이름"}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row", marginEnd: 16, marginTop: 4 }}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Icon name="user" size={24} />
          <Text>로그인</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Provider>
          <Stack.Navigator
            initialRouteName="MainPage"
            screenOptions={{
              headerRight: () => <UserIcon />,
            }}
          >
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="TeamInfo" component={TeamInfo} />
            <Stack.Screen name="Schedule" component={Schedule} />
            <Stack.Screen name="Records" component={Records} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerRight: () => <View></View>,
              }}
            />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </AuthProvider>
  );
}
