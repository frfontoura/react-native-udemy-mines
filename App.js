import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import params from "./src/params";
import MineField from "./src/components/MineField";
import { createMinedBoard } from "./src/functions";

export default function App() {
  const [cols, rows] = [params.getColumnsAmount(), params.getRowsAmount()];
  const [board, setBoard] = useState(
    createMinedBoard(rows, cols, minesAmount())
  );

  function minesAmount() {
    return Math.ceil(cols * rows * params.difficultLevel);
  }

  return (
    <View style={styles.container}>
      <Text>Iniciando o Mines</Text>
      <Text>
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>

      <View styles={styles.board}>
        <MineField board={board} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  board: {
    alignItems: "center",
    backgroundColor: "#AAA"
  }
});
