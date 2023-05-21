import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import "react-native-gesture-handler";
import { Provider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import store from "./store/store";
import { AuthProvider, useAuth } from "./components/AuthProvider/AuthProvider";
import MainPage from "./components/MainPage/MainPage";
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

  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const toggleMenu = () => {};

  if (user) {
    return (
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row", marginEnd: 16, marginTop: 4 }}
          onPress={() => {
            //TODO: Menu 컴포넌트
            // 1. 비번 등 유저정보 변경
            // 2. 관리자라면, 유저관리 + 대회관리
            // 3. 심판정보
            // 4. 로그아웃
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.text}>{"FIXME:유저이름"}</Text>
          <Icon name="user" size={24} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row", marginEnd: 16 }}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.text}>로그인</Text>
          <Icon name="user" size={24} />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 4,
    marginEnd: 10,
    fontWeight: "bold",
  },
});

export default function App() {
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        // TODO
      }
    };

    checkToken();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <ReduxProvider store={store}>
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
        </ReduxProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
