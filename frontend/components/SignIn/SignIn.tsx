import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAuth } from "../AuthProvider/AuthProvider";
import { login } from "../../services/auth";
import { RootStackParamList } from "../../App";

type NavigationProp = StackNavigationProp<RootStackParamList, "SignIn">;

interface SignInProps {
  navigation: NavigationProp;
}

export default function SignIn({ navigation }: SignInProps) {
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setToken, setUser } = useAuth();

  const handleSignIn = async () => {
    try {
      const response = await login(phonenumber, password);
      console.log(response.data);

      setToken(response.data.token);
      setUser(response.data.user);
      navigation.navigate("MainPage");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="전화번호"
        onChangeText={(text) => setPhonenumber(text)}
        value={phonenumber}
      />
      <TextInput
        placeholder="비밀번호"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="로그인" onPress={handleSignIn} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
}
