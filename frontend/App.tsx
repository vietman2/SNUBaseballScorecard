import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler"

import MainPage from "./components/MainPage";
import Testing from "./components/Testing";
import TeamInfo from "./components/TeamInfo";
import Schedule from "./components/ScheduleResults";
import Records from "./components/Records";

export type RootStackParamList = {
  MainPage: undefined;
  TeamInfo: undefined;
  Schedule: undefined;
  Records: undefined;
  Testing: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="TeamInfo" component={TeamInfo} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Records" component={Records} />
        <Stack.Screen name="Testing" component={Testing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;