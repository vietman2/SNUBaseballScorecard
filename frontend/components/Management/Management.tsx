import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { List } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";
import { styles } from "./styles";
import { fetchTournaments } from "../../services/tournament";
import { fetchTeams } from "../../services/team";
import { TeamInfoType, TournamentType } from "../../variables/types";
import RegistrationTable from "../../containers/Tables/RegistrationTable";

export type ManagementNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Management"
>;

interface Props {
  navigation: ManagementNavigationProp;
}

export default function Management({ navigation }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [tournamentList, setTournamentList] = useState<TournamentType[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<string>("대회 선택");
  const [teams, setTeams] = useState<TeamInfoType[]>([]);

  const handlePress = () => setExpanded(!expanded);
  const handleItemPress = (item: string) => {
    setSelectedTournament(item);
    setExpanded(false);
  };

  const renderTournaments = async () => {
    const tournaments: TournamentType[] = await fetchTournaments();

    setTournamentList(tournaments);
  };

  const getTeams = async () => {
    if (selectedTournament === "대회 선택") return;
    const teams: TeamInfoType[] = await fetchTeams(selectedTournament);

    setTeams(teams);
  }

  useEffect(() => {
    renderTournaments();
  }, []);

  useEffect(() => {
    getTeams();
  }, [selectedTournament]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>대회 관리</Text>
      <List.Section>
        <List.Accordion
          title={selectedTournament}
          expanded={expanded}
          onPress={handlePress}
          style={{ backgroundColor: "#fff" }}
          titleStyle={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
        >
          {tournamentList.map((tournament) => (
            <List.Item
              key={tournament.name}
              title={tournament.name}
              onPress={() => handleItemPress(tournament.name)}
              titleStyle={{ fontSize: 16, textAlign: "center" }}
            />
          ))}
        </List.Accordion>
      </List.Section>
      <View style={{ flex: 1 }}>{selectedTournament === "대회 선택" ? <></> : <RegistrationTable tournament={selectedTournament} teams={teams} navigation={navigation} />}</View>
      
    </View>
  );
}
