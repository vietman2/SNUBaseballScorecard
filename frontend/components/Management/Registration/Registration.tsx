import React, { useState } from "react";
import { View, Text, Alert, Platform } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";

import { RootStackParamList } from "../../../App";
import { styles } from "./styles";
import { uploadExcel } from "../../../services/player";
import { RegistrationType } from "../../../variables/types";

/* 백엔드에서 엑셀을 읽고 프론트로 summary를 넘겨주면,
관리자가 체크박스에 체크하면서 선수들을 등록할 수 있도록 하는 페이지 */

type RegistrationRouteProp = RouteProp<RootStackParamList, "Registration">;

interface Props {
  route: RegistrationRouteProp;
}

export default function Registration({ route }: Props) {
  const { team, tournament } = route.params;
  const [ summary, setSummary ] = useState<RegistrationType>();

  const uploadFile = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    if (file.type === "cancel") {
      Alert.alert("파일을 선택해주세요.");
    } else if (!file.name.endsWith(".xlsx")) {
      Alert.alert("엑셀 파일만 업로드 가능합니다.");
    } else {
      const fileURI = Platform.OS === "android" ? file.uri : file.uri.replace("file://", "");

      const res = await fetch(fileURI);
      const blob = await res.blob();

      const formData = new FormData();
      formData.append("file", blob, file.name);

      const response = await uploadExcel(formData);

      if (response.status === 200) {
        setSummary(response.data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {tournament} {team.team_name} 선수 등록
        </Text>
        <Text style={styles.headerText}>대표자: {team.captain_Name} ({team.captain_PhoneNumber})</Text>
      </View>
      <View>
        <Button mode="contained" style={styles.button} onPress={() => uploadFile()}>.xlsx 파일 업로드</Button>
      </View>
      {summary ? <></> : <></>}
    </View>
  );
}
