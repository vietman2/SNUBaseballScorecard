import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler"

import MainPage from "./Components/MainPage";
import Testing from "./Components/Testing";

export type RootStackParamList = {
  MainPage: undefined;
  Testing: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Testing" component={Testing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;