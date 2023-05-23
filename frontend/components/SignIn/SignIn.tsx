import React, { useState } from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";

import { useAuth } from "../AuthProvider/AuthProvider";
import { login } from "../../services/auth";
import { RootStackParamList } from "../../App";
import { buttonStyles, imageStyles, styles } from "./styles";

type NavigationProp = StackNavigationProp<RootStackParamList, "SignIn">;

interface SignInProps {
  navigation: NavigationProp;
}

export default function SignIn({ navigation }: SignInProps) {
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setToken, setUser } = useAuth();

  //TODO: ADD PASSWORD RESET

  const handleSignIn = async () => {
    const response = await login(phonenumber, password);

    if (response.status === 200) {
      setErrorMessage("");
      setToken(response.data.token);
      setUser(response.data.user);
      navigation.navigate("MainPage");
    } else {
      let message = "로그인에 실패했습니다.";
      if (response.status === 401) {
        message = "전화번호 또는 비밀번호가 잘못되었습니다.";
      } else if (response.status === 500) {
        message = "서버 연결에 오류가 발생했습니다.";
      } else {
        message = "알 수 없는 오류가 발생했습니다.";
      }
      setErrorMessage(message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      enabled
    >
      <View style={styles.upper}>
        <Image
          style={imageStyles.logo}
          source={require("../../assets/images/logo.jpg")}
        />
      </View>
      <View style={styles.middle}>
        <View style={styles.texts}>
          <Text style={styles.title}>로그인</Text>
          <Text style={styles.subtitle}>심판들만 로그인 가능합니다.</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="전화번호"
            onChangeText={(text) => setPhonenumber(text)}
            value={phonenumber}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={buttonStyles.button} onPress={handleSignIn}>
          <Text style={buttonStyles.buttonText}>로그인</Text>
          <Icon name="arrow-right-alt" size={25} />
        </TouchableOpacity>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
      </View>
      <View style={styles.lower}>
        <Image
          style={imageStyles.background}
          source={require("../../assets/images/background.jpg")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
