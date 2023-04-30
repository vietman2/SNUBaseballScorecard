import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";

import { styles, dropdownStyles } from "./styles";
import { fetchTournamentNames } from "../../services/tournament";
import { fetchGroups } from "../../services/group";
import { GroupType } from "../../variables/types";

export default function ScheduleResults() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<ItemType<string>[]>([]);
  const [tour, setTour] = useState<boolean>(false);

  const [groups, setGroups] = useState<GroupType[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);

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
      setTour(false);
      const response = await fetchGroups(value);
      const groups = [];

      for (const group of response) {
        groups.push(group);
      }

      setGroups(groups);
      setSelectedGroup(groups[0]);
    }
  };

  const renderGroupView = () => {
    return (
      <View style={styles.groups_row}>
        {groups.map((group, index) => {
          return (
            <View
              style={
                selectedGroup === group
                  ? styles.type_view_selected
                  : styles.type_view
              }
              key={index}
            >
              <TouchableOpacity onPress={() => setSelectedGroup(groups[index])}>
                <Text
                  style={
                    selectedGroup === group
                      ? styles.type_text_selected
                      : styles.type_text
                  }
                >
                  {group.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  const onPress = (type: number) => {
    if (type === 0) setTour(false);
    else setTour(true);
  };

  const showData = () => {
    if (value === null) return <></>;
    else {
      return (
        <View style={styles.info}>
          <View style={styles.type}>
            <View style={tour ? styles.type_view : styles.type_view_selected}>
              <TouchableOpacity onPress={() => onPress(0)}>
                <Text
                  style={tour ? styles.type_text : styles.type_text_selected}
                >
                  조별예선
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tour ? styles.type_view_selected : styles.type_view}>
              <TouchableOpacity onPress={() => onPress(1)}>
                <Text
                  style={tour ? styles.type_text_selected : styles.type_text}
                >
                  토너먼트
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {tour ? <></> : renderGroupView()}
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
      {showData()}
    </View>
  );
}
