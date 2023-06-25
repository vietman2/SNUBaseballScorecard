import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { ManagementNavigationProp } from "../../components/Management/Management";
import { TeamInfoType } from "../../variables/types";

interface Props {
  tournament: string;
  teams: TeamInfoType[];
  navigation: ManagementNavigationProp;
}

export default function RegistrationTable({
  tournament,
  teams,
  navigation,
}: Props) {
  const onPressRegistration = (team: TeamInfoType) => {
    // 기간 지나면 비활성화
    navigation.navigate("Registration", {
      team: team,
      tournament: tournament,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>팀 목록</Text>
      </View>

      <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.topColumn}>팀 이름</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.topColumn}>등록 완료</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.topColumn}>등록 선수 수 (등록 대기)</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.topColumn}>엔트리 등록</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.topColumn}>추가 등록</Text>
        </View>
      </View>

      <View style={{ flex: 8 }}>
        {teams.map((team, index) => {
          return (
            <View key={index} style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "center" }}>{team.team_name}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "center" }}>
                  {team.num_players > 0 ? "O" : "X"}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "center" }}>0 (0)</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  mode="contained"
                  onPress={() => onPressRegistration(team)}
                >
                  등록하기
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button mode="contained" onPress={() => {}}>
                  추가등록
                </Button>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  topColumn: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
