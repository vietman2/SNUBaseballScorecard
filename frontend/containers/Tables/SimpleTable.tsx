import React from "react";
import { Text, View } from "react-native";

interface Props {
  title: string | null;
  columns: string[];
  data: string[][];
}

export default function SimpleTable({ title, columns, data }: Props) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        {columns.map((column, index) => (
          <Text
            key={index}
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              width: 100,
            }}
          >
            {column}
          </Text>
        ))}
      </View>
      {data.map((row, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#000",
          }}
        >
          {row.map((column, index) => (
            <Text
              key={index}
              style={{
                fontSize: 16,
                textAlign: "center",
                width: 100,
              }}
            >
              {column}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
