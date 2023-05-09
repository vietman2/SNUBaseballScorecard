import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
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

  return (
    <View>
      <TouchableOpacity
        style={{ flexDirection: "row", marginEnd: 16, marginTop: 4 }}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Icon name="user" size={24} />
        {user ? <Text>{"유저이름"}</Text> : <Text>로그인</Text>}
      </TouchableOpacity>
    </View>
  );
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
