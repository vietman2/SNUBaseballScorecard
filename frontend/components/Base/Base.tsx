import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { Provider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { View } from "react-native";

import store from "../../store/store";
import { AuthProvider } from "../AuthProvider/AuthProvider";
import MainPage from "../MainPage/MainPage";
import TeamInfo from "../TeamInfo/TeamInfo";
import Schedule from "../ScheduleResults/ScheduleResults";
import Records from "../Records/Records";
import Management from "../Management/Management";
import SignIn from "../SignIn/SignIn";
import Registration from "../Management/Registration/Registration";
import UserIcon from "./UserIcon";
import { RootStackParamList } from "../../App";

const Stack = createStackNavigator<RootStackParamList>();

export default function Base() {
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
              <Stack.Screen name="Management" component={Management} />
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
