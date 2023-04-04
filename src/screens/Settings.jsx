import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"

const Settings = props => {

  // navigation is a prop passed to this component
  const { navigation } = props

  return (
    <View style={styles.container}>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      // This button will navigate to the Expenses screen
      <Button title="Go to Expenses" onPress={() => navigation.navigate("Expenses")} />
      // to clear the database
      <Button title="Clear Database" onPress={() => dropTableexpense()} />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  bold: {
    fontWeight: "bold"
  }
})

export default Settings
