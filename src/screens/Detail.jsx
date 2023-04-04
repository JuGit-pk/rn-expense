import React from "react"
import { StyleSheet, Text, View } from "react-native"

const Detail = () => {
  return (
    <View style={styles.container}>
      <Text>
        Content for the <Text style={styles.bold}>detail</Text> component goes here.
      </Text>
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

export default Detail
