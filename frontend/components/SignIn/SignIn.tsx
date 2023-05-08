import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

import { login } from "../../services/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const response = await login(email, password);
    if (response.status === 200) {
      Alert.alert("로그인에 성공했습니다.");
    } else {
      Alert.alert("로그인에 실패했습니다.");
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
      <Button title="로그인" onPress={handleSignIn} />
    </View>
  );
}
