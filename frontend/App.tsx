import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler"

import MainPage from "./components/MainPage";
import TeamInfo from "./components/TeamInfo/TeamInfo";
import Schedule from "./components/ScheduleResults/ScheduleResults";
import Records from "./components/Records/Records";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;