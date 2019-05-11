import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

import params from "./src/params";
import Header from "./src/components/Header";
import MineField from "./src/components/MineField";
import LevelSelection from './src/screens/LevelSelection'
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from "./src/functions";

export default function App() {
  const [cols, rows] = [params.getColumnsAmount(), params.getRowsAmount()];
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [board, setBoard] = useState(
    createMinedBoard(rows, cols, minesAmount())
  );

  function createState() {
    setBoard(createMinedBoard(rows, cols, minesAmount()));
    setWon(false);
    setLost(false);
    setShowLevelSelection(false);
  }

  function minesAmount() {
    return Math.ceil(cols * rows * params.difficultLevel);
  }

  function onOpenField(row, column) {
    const clone = cloneBoard(board);
    openField(clone, row, column);
    const isLost = hadExplosion(clone);
    const isWon = wonGame(clone);

    if (isLost) {
      showMines(clone);
      Alert.alert("Perdeeeu!", "Tente outra vez!");
    }

    if (isWon) {
      Alert.alert("Parabéns!!!", "Você Venceu!");
    }

    setBoard(clone);
    setWon(isWon);
    setLost(isLost);
  }

  function onSelectField(row, column) {
    const clone = cloneBoard(board);
    invertFlag(clone, row, column);
    const isWon = wonGame(clone);

    if (isWon) {
      Alert.alert("Parabéns", "Você Venceu!");
    }

    setBoard(clone);
    setWon(isWon);
  }

  function onLevelSelected(level) {
    params.difficultLevel = level;
    createState();
  }

  return (
    <View style={styles.container}>
      <LevelSelection
        isVisible={showLevelSelection}
        onLevelSelected={onLevelSelected}
        onCancel={() => setShowLevelSelection(false)}
      />
      <Header
        flagsLeft={minesAmount() - flagsUsed(board)}
        onNewGame={() => createState()}
        onFlagPress={() => setShowLevelSelection(true)}
      />
      <View styles={styles.board}>
        <MineField
          board={board}
          onOpenField={onOpenField}
          onSelectField={onSelectField}
        />
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
