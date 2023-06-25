import React from "react";
import { View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../../../App";

/* 백엔드에서 엑셀을 읽고 프론트로 summary를 넘겨주면,
관리자가 체크박스에 체크하면서 선수들을 등록할 수 있도록 하는 페이지 */

type RegistrationRouteProp = RouteProp<RootStackParamList, "Registration">;

interface Props {
  route: RegistrationRouteProp;
}

export default function Registration({ route }: Props) {
  return (
    <View>
      <Text>Registration</Text>
    </View>
  );
}
