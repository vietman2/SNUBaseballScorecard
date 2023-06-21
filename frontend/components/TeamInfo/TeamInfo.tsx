import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { fetchTournaments } from "../../services/tournament";
import { fetchTeams } from "../../services/team";
import { TeamInfoType, TournamentType } from "../../variables/types";
import { dropdownStyles, styles } from "./styles";

// TODO: 팀 이름 터치 시 팀 정보 페이지로 이동

export default function TeamInfo() {

  return (
    <View style={styles.container}>
    </View>
  );
}