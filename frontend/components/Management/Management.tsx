import React, { useEffect, useState } from "react";
import { Text, View, Platform, Alert, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";

import { dropdownStyles, styles } from "./styles";
import { fetchTournamentNames } from "../../services/tournament";
import { fetchTeams } from "../../services/team";
import { TeamType } from "../../variables/types";
import { uploadExcel } from "../../services/player";

export default function Management() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<ItemType<string>[]>([]);
  const [teams, setTeams] = useState<TeamType[]>([]);

  const getList = async () => {
    const response = await fetchTournamentNames();
    const tournaments = [];

    for (const name of response.names) {
      tournaments.push({
        label: name,
        value: name,
      });
    }

    setItems(tournaments);
    setValue(tournaments[0].value);
    getData();
  };

  const getData = async () => {
    if (value == null) return;
    else {
      const response = await fetchTeams(value);
      const teams = [];

      for (const team of response) {
        teams.push(team);
      }

      setTeams(teams);
    }
  };

  const uploadFile = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    if (file.type === "cancel") {
      Alert.alert("파일을 선택해주세요.");
      return;
    }

    if (!file.name.endsWith(".xlsx")) {
      Alert.alert("엑셀 파일만 업로드 가능합니다.");
      return;
    }

    const fileUri =
      Platform.OS === "android" ? file.uri : file.uri.replace("file://", "");
    const res = await fetch(fileUri);
    const blob = await res.blob();

    const formData = new FormData();
    formData.append("file", blob, file.name);

    const response = await uploadExcel(formData);

    console.log(response);
  };

  const addPlayer = () => {
    // TODO
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>대회 관리</Text>
      </View>
      <View style={styles.pickerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subtitle}>대회 선택</Text>
        </View>
        <View style={{ flex: 1 }}>
          <DropDownPicker
            items={items}
            setItems={setItems}
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            labelStyle={dropdownStyles.dropdownLabel}
            textStyle={dropdownStyles.dropdownText}
            placeholder="대회 선택"
            onChangeValue={getData}
          />
        </View>
      </View>
      <View style={{ flex: 8 }}>
        <View>
          <Text style={styles.subtitle}>팀 목록 ({teams.length})</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 3 }}>
            <Text style={styles.text}>팀 이름</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>등록 완료</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>등록 대기</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>엔트리 업로드 (.xlsx)</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>추가등록</Text>
          </View>
        </View>
        {teams.map((team, index) => (
          <View key={index} style={{ flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
              <Text style={styles.text}>{team.team}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>{team.num_players}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>{0}</Text>
            </View>
            <View style={{ flex: 1 }}>
              {team.initial_registration ? (
                <Text style={styles.text}>등록 완료</Text>
              ) : (
                <TouchableOpacity style={styles.button} onPress={() => uploadFile()}>
                  <Text style={styles.buttonText}>업로드</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.button} onPress={() => addPlayer()}>
                <Text style={styles.buttonText}>추가등록</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
