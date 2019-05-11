import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";

export default function LevelSelection({
  onCancel,
  isVisible,
  onLevelSelected
}) {
  function LevelSelectionButton({ label, level, style, onLevelSelected }) {
    return (
      <TouchableOpacity
        style={[styles.button, styles[style]]}
        onPress={() => onLevelSelected(level)}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <Modal
      onRequestClose={onCancel}
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.frame}>
        <View style={styles.container}>
          <Text style={styles.title}>Selecione o Nível</Text>
          <LevelSelectionButton
            label={"Fácil"}
            level={0.1}
            style={"bgEasy"}
            onLevelSelected={onLevelSelected}
          />
          <LevelSelectionButton
            label={"Intermediário"}
            level={0.2}
            style={"bgNormal"}
            onLevelSelected={onLevelSelected}
          />
          <LevelSelectionButton
            label={"Difícil"}
            level={0.3}
            style={"bgHard"}
            onLevelSelected={onLevelSelected}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  container: {
    backgroundColor: "#EEE",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 15
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  button: {
    marginTop: 10,
    padding: 5,
    alignItems: "center"
  },
  buttonLabel: {
    fontSize: 20,
    color: "#EEE",
    fontWeight: "bold"
  },
  bgEasy: {
    backgroundColor: "#49b65d"
  },
  bgNormal: {
    backgroundColor: "#2765F7"
  },
  bgHard: {
    backgroundColor: "#F26337"
  }
});
