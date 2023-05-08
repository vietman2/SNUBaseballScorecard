import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

import { signup } from "../../services/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleSignUp = async () => {
    if (password !== passwordCheck) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      const response = await signup(email, password);
      if (response.status === 201) {
        Alert.alert("회원가입에 성공했습니다.");
      } else {
        Alert.alert("회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <View>
      <TextInput
        placeholder="이메일"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="비밀번호"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        placeholder="비밀번호 확인"
        onChangeText={(text) => setPasswordCheck(text)}
        value={passwordCheck}
      />
      <Button title="회원가입" onPress={handleSignUp} />
    </View>
  )
}
