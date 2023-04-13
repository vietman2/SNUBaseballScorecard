import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { fetchTournaments } from "../services/tournament";

/*
type TournamentType = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}
*/

export default function TeamInfo() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("baseball");
  const [items, setItems] = useState<ItemType<string>[]>([
    { label: "2022 총장배", value: "2022 총장배" },
  ]);

  useEffect(() => {
    const tournaments = fetchTournaments();
    console.log(tournaments);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Text style={styles.title}>대회</Text>
        <DropDownPicker
          items={items}
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          setItems={setItems}
          style={styles.dropdown}
          labelStyle={styles.dropdownLabel}
          textStyle={styles.dropdownText}
        />
      </View>
      <View style={styles.info}></View>
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
  },
  info: {
    flex: 9,
    backgroundColor: "black",
  },
  title: {
    fontSize: 32,
  },
  dropdown: {
    backgroundColor: "#fafafa",
  },
  dropdownLabel: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdownText: {
    fontSize: 18,
  },
});
