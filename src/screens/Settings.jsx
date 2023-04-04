import React from "react";
import { StyleSheet, View, Button, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

const Settings = (props) => {
  // navigation is a prop passed to this component
  const { navigation } = props;
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* add a theme toggle button */}
      <TouchableOpacity
        style={[
          styles.button,
          isDarkMode ? styles.darkButton : styles.lightButton,
        ]}
        onPress={toggleTheme}
      >
        <Text
          style={[
            styles.buttonText,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
      </TouchableOpacity>

      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      {/* // This button will navigate to the Expenses screen */}
      <Button
        title="Go to Expenses"
        onPress={() => navigation.navigate("Expenses")}
      />
      {/* // to clear the database */}
      <Button title="Clear Database" onPress={() => dropTableexpense()} />
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    bold: {
      fontWeight: "bold",
    },
    button: {
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginHorizontal: 8,
      marginBottom: 16,
      color: theme.colors.text,
      // add border
      borderWidth: 1,
      borderColor: theme.colors.text,
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default Settings;
