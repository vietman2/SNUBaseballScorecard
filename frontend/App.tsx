import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import UserIcon from "react-native-vector-icons/FontAwesome5";

import MainPage from "./components/MainPage";
import TeamInfo from "./components/TeamInfo/TeamInfo";
import Schedule from "./components/ScheduleResults/ScheduleResults";
import Records from "./components/Records/Records";
import Registration from "./components/Registration/Registration";

export type RootStackParamList = {
  MainPage: undefined;
  TeamInfo: undefined;
  Schedule: undefined;
  Records: undefined;
  Registration: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{
            headerRight: () => (
              <UserIcon
                name="user"
                size={22}
                style={{ paddingEnd: 15 }}
                onPress={() => {console.log("SIGNIN AND SIGNUP")}}
              />
            ),
          }}
        />
        <Stack.Screen name="TeamInfo" component={TeamInfo} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Records" component={Records} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
