import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Dialog, Portal } from "react-native-paper"
import CategoryList from "../components/category/CategoryList"
import dashBoard from "../styles/Dashboard"
import { useFocusEffect } from "@react-navigation/native"

// db functions
import { dbGetTag, dbInit } from "../database/CategoryTable"

const Category = props => {
  const { navigation } = props
  const [visible, setVisible] = React.useState(false)
  const [formData, setFormData] = useState([])

  // Refresh data
  const refreshVal = () => {
    dbGetTag().then(data => {
      setFormData(data)
    })
  }
  // Init db
  useFocusEffect(
    React.useCallback(() => {
      dbInit()
        .then(() => dbGetTag())
        .then(data => {
          setFormData(data)
        })
        .catch(err => {
          console.log("Databae error", err)
        })
        .finally(() => {
          console.log("Database initialized")
        })
      // Do something when the screen is focused
      return () => {
        console.log("Screen was unfocused")
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      }
    }, [])
  )

  return (
    <View style={styles.container}>
      <View style={dashBoard.body}>
        <CategoryList data={formData} refreshVal={refreshVal} />
      </View>
      <Button icon="plus" style={styles.fab} mode="contained" onPress={() => navigation.navigate("CategoryAdd")}>
        Add Category
      </Button>

      {/* add a touchable opacity button to drop the table */}
      {/* <TouchableOpacity onPress={() => dropTable()}>
        <Text style={styles.bold}>Drop Table</Text>
      </TouchableOpacity> */}
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
  },
  fab: {
    backgroundColor: "#F94A29",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
})

export default Category
