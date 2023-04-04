import { Alert, View, Text, ScrollView, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import uuid from "react-native-uuid"
import form from "../../styles/Form.js"

// custom imports
import { dbInsert, dbDelete } from "../../database/CategoryTable"

const CategoryList = ({ data, refreshVal }) => {
  const [task, setTask] = useState("")

  // Alert dialog to confirm delete
  const AlertDialog = (title, description, onOkPressFunction) => {
    Alert.alert(
      `${title}`,
      `${description}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => onOkPressFunction() }
      ],
      { cancelable: false }
    )
  }

  // Delete single tag
  const deleteData = id => {
    AlertDialog("Delete", "Are you sure you want to delete this category?", () => {
      dbDelete(id)
        .then(() => {
          refreshVal()
        })
        .catch(err => {
          console.log("Error", err)
        })
    })
  }
  return (
    <View>
      <ScrollView style={form.view}>
        {data == "" ? (
          <Text style={form.noData}>No data available</Text>
        ) : (
          data?.map((game, index) => (
            <View style={form.listitem} key={index}>
              <View style={form.list}>
                <View style={form.listRight}>
                  <View style={{ backgroundColor: game?.color, width: 20, height: 20, marginRight: 10, marginLeft: 0, borderRadius: 10 }}></View>
                </View>
                <View style={form.listLeft}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold"
                    }}
                  >
                    {game?.tag}
                  </Text>
                </View>
                {/* Show the color of the tag */}
                <View>
                  <TouchableOpacity onPress={() => deleteData(game.id)}>
                    <Text style={form.deleteButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default CategoryList
