import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

import { ManagementNavigationProp } from "./Management";
import { TeamInfoType } from "../../variables/types";
import { tableStyles } from "./styles";

interface Props {
  tournament: string;
  teams: TeamInfoType[];
  navigation: ManagementNavigationProp;
}

export default function RegistrationTable(props: Props) {
  const tournament = props.tournament;
  const teams = props.teams;
  const navigation = props.navigation;

  const onPressRegistration = (team: TeamInfoType) => {
    // 기간 지나면 비활성화
    navigation.navigate("Registration", {
      team: team,
      tournament: tournament,
    });
  };

  const onPressAddRegistration = () => {
    console.log("추가 등록");
  }

  return (
    <View style={tableStyles.flex1}>
      <View>
        <Text style={tableStyles.title}>팀 목록</Text>
      </View>

      <View style={tableStyles.topBox}>
        <View style={tableStyles.flex1}>
          <Text style={tableStyles.topColumn}>팀 이름</Text>
        </View>
        <View style={tableStyles.flex1}>
          <Text style={tableStyles.topColumn}>등록 완료</Text>
        </View>
        <View style={tableStyles.flex1}>
          <Text style={tableStyles.topColumn}>등록 선수 수 (등록 대기)</Text>
        </View>
        <View style={tableStyles.flex1}>
          <Text style={tableStyles.topColumn}>엔트리 등록</Text>
        </View>
        <View style={tableStyles.flex1}>
          <Text style={tableStyles.topColumn}>추가 등록</Text>
        </View>
      </View>
      {teams.map((team, index) => {
          return (
            <View key={index} style={tableStyles.otherBox}>
              <View style={tableStyles.flex1}>
                <Text style={tableStyles.centerText}>{team.team_name}</Text>
              </View>
              <View style={tableStyles.flex1}>
                <Text style={tableStyles.centerText}>
                  {team.initial_registration ? "O" : "X"}
                </Text>
              </View>
              <View style={tableStyles.flex1}>
                <Text style={tableStyles.centerText}>
                  {team.num_players} (0)
                </Text>
              </View>
              <View style={tableStyles.flex1}>
                <Button
                  mode="contained"
                  onPress={() => onPressRegistration(team)}
                >
                  등록하기
                </Button>
              </View>
              <View style={tableStyles.flex1}>
                <Button
                  mode="contained"
                  onPress={() => onPressAddRegistration()}
                >
                  추가등록
                </Button>
              </View>
            </View>
          );
        })}
    </View>
  );
}

