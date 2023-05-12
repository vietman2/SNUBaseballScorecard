import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";

import { fetchTournamentNames } from "../../services/tournament";
import { fetchTeams } from "../../services/team";
import { TeamType } from "../../variables/types";
import { dropdownStyles, styles } from "./styles";

// TODO: 팀 이름 터치 시 팀 정보 페이지로 이동

export default function TeamInfo() {
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

  const renderTeamInfo = (team: TeamType) => {
    return (
      <View style={styles.info_row}>
        <Text style={{ flex: 3, textAlign: "center", fontWeight: "bold" }}>
          {team.team_id}
        </Text>
        <Text style={{ flex: 2, textAlign: "center" }}>
          {team.captain_Name}
        </Text>
        <Text style={{ flex: 1, textAlign: "center" }}>{0}</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>{0}</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>{0}</Text>
      </View>
    );
  };

  const showData = () => {
    if (value === null) return <></>;
    else {
      return (
        <View>
          <View style={styles.info_row}>
            <Text style={{ flex: 3, fontWeight: "bold", textAlign: "center" }}>
              팀명
            </Text>
            <Text style={{ flex: 2, fontWeight: "bold", textAlign: "center" }}>
              대표자
            </Text>
            <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
              선수 수
            </Text>
            <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
              와일드카드
            </Text>
            <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
              선수 출신
            </Text>
          </View>
          {teams.map((team) => {
            return renderTeamInfo(team);
          })}
        </View>
      );
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
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
      <View style={styles.info}>{showData()}</View>
    </View>
  );
}