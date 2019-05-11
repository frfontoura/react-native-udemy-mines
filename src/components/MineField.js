import React from "react";
import { View, StyleSheet } from "react-native";
import Field from "./Field";

export default function MineField({ board, onOpenField, onSelectField }) {
  const rows = board.map((row, r) => {
    const columns = row.map((field, c) => {
      return (
        <Field
          {...field}
          key={c}
          onOpen={() => onOpenField(r, c)}
          onSelect={e => onSelectField(r, c)}
        />
      );
    });
    return (
      <View key={r} style={styles.row}>
        {columns}
      </View>
    );
  });

  return <View style={styles.container}>{rows}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEE"
  },
  row: {
    flexDirection: "row"
  }
});
