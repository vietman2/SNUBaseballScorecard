import React, { useState, useEffect } from "react";
import { View, Text, Platform, Alert, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";

import { RootStackParamList } from "../../../App";
import { uploadExcel } from "../../../services/player";
import { styles } from "./styles";
import { fetchPlayersTeam } from "../../../services/team";
import { PlayerRegType, RegistrationType } from "../../../variables/types";

/* 백엔드에서 엑셀을 읽고 프론트로 summary를 넘겨주면,
관리자가 체크박스에 체크하면서 선수들을 등록할 수 있도록 하는 페이지 */

type RegistrationRouteProp = RouteProp<RootStackParamList, "Registration">;

interface Props {
  route: RegistrationRouteProp;
}

export default function Registration({ route }: Props) {
  const tournament = route.params.tournament;
  const team = route.params.team;

  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [playerList, setPlayerList] = useState<any[]>([]);
  const [summary, setSummary] = useState<RegistrationType>();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [needCheck, setNeedCheck] = useState<boolean>(false);

  const getPlayers = async () => {
    const response = await fetchPlayersTeam(tournament, team.team);

    if (response.status === 404) {
      setNumPlayers(0);
    } else {
      setNumPlayers(response.data.length);
      // TODO: setPlayerList(response.data);
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

    setSummary(response);
    setUploaded(true);
    setNeedCheck(true);
  };

  useEffect(() => {
    setUploaded(team.initial_registration);
    setNeedCheck(false);
    getPlayers();
  }, []);

  const renderSummary = () => {
    if (summary) {
      if (summary.new_players.length > 0) {
        return (
          <View style={{ margin: 10 }}>
            <Text style={{ ...styles.boldText, color: "#17A2B8" }}>신규등록</Text>
            <View style={{ margin: 10 }}>{tableHeader(0)}</View>
            {summary?.new_players.map((player: PlayerRegType) => {
              return (
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{player.name}</Text>
                  <Text style={styles.tableCell}>{player.college}</Text>
                  <Text style={styles.tableCell}>{player.department}</Text>
                  <Text style={styles.tableCell}>{player.student_id}</Text>
                  <Text style={styles.tableCell}>{player.status}</Text>
                </View>
              );
            })}
          </View>
        );
      }
      if (summary.existing_players.length > 0) {
        return (
          <View style={{ margin: 10 }}>
            <Text style={{ ...styles.boldText, color: "#007BFF" }}>재등록</Text>
            <View style={{ margin: 10 }}>{tableHeader(1)}</View>
            {summary?.new_players.map((player: PlayerRegType) => {
              return (
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{player.name}</Text>
                  <Text style={styles.tableCell}>{player.college}</Text>
                  <Text style={styles.tableCell}>{player.department}</Text>
                  <Text style={styles.tableCell}>{player.student_id}</Text>
                  <Text style={styles.tableCell}>{player.status}</Text>
                  {/* 마지막등록한 대회 */}
                </View>
              );
            })}
          </View>
        );
      }
      if (summary.similar_players.length > 0) {
        return (
          <View style={{ margin: 10 }}>
            <Text>
              <Text style={{ ...styles.boldText, color: "#FFC107" }}>
                확인 필요{" "}
              </Text>
              (같은사람이 맞는지)
            </Text>
            <View style={{ margin: 10 }}>{tableHeader(2)}</View>
            {summary?.new_players.map((player: PlayerRegType) => {
              return (
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{player.name}</Text>
                  <Text style={styles.tableCell}>{player.college}</Text>
                  <Text style={styles.tableCell}>{player.department}</Text>
                  <Text style={styles.tableCell}>{player.student_id}</Text>
                  <Text style={styles.tableCell}>{player.status}</Text>
                </View>
              );
            })}
          </View>
        );
      }
      if (summary.errors.length > 0) {
        return (
          <View style={{ margin: 10 }}>
            <Text>
              <Text style={{ ...styles.boldText, color: "#DC3545" }}>오류 </Text>
              (학번은 같은데 이름이 다름)
            </Text>
            <View style={{ margin: 10 }}>{tableHeader(3)}</View>
            {summary?.new_players.map((player: PlayerRegType) => {
              return (
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{player.name}</Text>
                  <Text style={styles.tableCell}>{player.college}</Text>
                  <Text style={styles.tableCell}>{player.department}</Text>
                  <Text style={styles.tableCell}>{player.student_id}</Text>
                  <Text style={styles.tableCell}>{player.status}</Text>
                </View>
              );
            })}
          </View>
        );
      }
    }
  };

  const tableHeader = (type: number) => {
    // 0: 신규등록, 1: 재등록, 2: 확인필요, 3: 오류, 4: 기등록명단
    return (
      <View style={styles.tableRow}>
        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>이름</Text>
        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>학번</Text>
        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>대학</Text>
        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>학과</Text>
        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
          선출여부
        </Text>
        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
          재적현황
        </Text>
        {type === 1 ? (
          <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
            마지막 등록 대회
          </Text>
        ) : (
          <></>
        )}

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.team}>
          {tournament} {team.team}{" "}
        </Text>
        {"\n선수 등록 페이지"}
      </Text>

      {uploaded ? (
        <View style={{ margin: 10 }}>
          <Text style={{ ...styles.boldText, color: "28A745" }}>
            등록 완료 ({numPlayers})
          </Text>
          <View style={{ margin: 10 }}>
            {numPlayers > 0 ? tableHeader(4) : <></>}
            {/* 기등록명단 & 추가등록 버튼 */}
          </View>
        </View>
      ) : (
        <View style={{ margin: 10 }}>
          <TouchableOpacity style={styles.button} onPress={uploadFile}>
            <Text style={styles.boldText}>
              등록된 선수가 없습니다. 업로드하기 (.xlsx)
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {needCheck ? (
        <View style={{ margin: 10 }}>
          <Text style={styles.boldText}>등록 확인</Text>
          {renderSummary()}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
