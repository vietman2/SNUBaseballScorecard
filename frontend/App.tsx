import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import "react-native-gesture-handler";
import { Provider } from "react-native-paper";

import MainPage from "./components/MainPage";
import TeamInfo from "./components/TeamInfo/TeamInfo";
import Schedule from "./components/ScheduleResults/ScheduleResults";
import Records from "./components/Records/Records";
import Registration from "./components/Registration/Registration";
import SignIn from "./components/SignIn/SignIn";

export type RootStackParamList = {
  MainPage: undefined;
  TeamInfo: undefined;
  Schedule: undefined;
  Records: undefined;
  Registration: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator initialRouteName="MainPage">
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="TeamInfo" component={TeamInfo} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="Records" component={Records} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Login" component={SignIn} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
