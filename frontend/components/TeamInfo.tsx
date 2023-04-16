import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";

import { fetchTournamentNames } from "../services/tournament";
import { fetchTeams } from "../services/team";
import { TeamType } from "../variables/types";

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

  const render = (team: TeamType) => {
    return (
      <View style={styles.row}>
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
    if (value == null) return <></>;
    else {
      return (
        <View>
          {teams.map((team) => {
            return render(team);
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

      <View style={styles.info}>
        <View style={styles.row}>
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
        {showData()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  picker: {
    flex: 1,
    flexDirection: "row",
    zIndex: 10,
  },
  info: {
    flex: 9,
    backgroundColor: "white",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

const dropdownStyles = StyleSheet.create({
  dropdownLabel: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdownText: {
    fontSize: 18,
    textAlign: "center",
  },
});

