import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import uuid from "react-native-uuid";
import { Picker } from "@react-native-picker/picker";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import { dbEditExpense, dbInsertExpense } from "../../database/ExpenseTable";
import { dbGetTag } from "../../database/CategoryTable";

const ExpenseFrom = (props) => {
  const { navigation } = props;
  const action = props?.route?.params?.action;
  const data = props?.route?.params?.data;

  // hooks for expense title, amount, tag, note and date
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [amount, setAmount] = useState("");
  const [tag, setTag] = useState("");
  const [date, setDate] = useState(new Date());
  // const [inputDate, setInputDate] = useState(new Date())

  // Dropdown options (income and expense)
  const [expenseSource, setSource] = useState("Income");
  const [tagData, setTagData] = useState([]);

  useEffect(() => {
    if (action.toUpperCase() === "EDIT") {
      setExpenseTitle(data.expenseTitle);
      setAmount(data.expenseAmount);
      setTag(data.expenseTag);
      setDate(data.expenseDate);
      setSource(data.expenseSource);
      setExpenseNote(data.setExpenseNote);
    }

    dbGetTag()
      .then((data) => {
        setTagData(data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  // function to add expense
  const onClickAction = () => {
    if (action.toUpperCase() === "ADD") {
      dbInsertExpense(
        uuid.v4(),
        expenseTitle,
        amount,
        date,
        tag,
        expenseSource,
        expenseNote
      );
      navigation.navigate("Expenses");
    } else {
      dbEditExpense(
        data.id,
        expenseTitle,
        amount,
        date,
        tag,
        expenseSource,
        expenseNote
      );
      navigation.navigate("Expenses");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#F94A29",
            textAlign: "center",
            marginTop: 24,
            marginBottom: 15,
          }}
        >
          {action.toUpperCase() === "ADD" ? "Add Expense" : "Edit Expense"}
        </Text>
        <TextInput
          mode="outlined"
          label="Expense Title"
          placeholder="Enter you expense label"
          value={expenseTitle}
          onChangeText={(title) => setExpenseTitle(title)}
        />
        <TextInput
          mode="outlined"
          keyboardType="numeric"
          label="Amount"
          placeholder="$"
          value={amount}
          onChangeText={(amount) => setAmount(amount)}
        />
        <TextInput
          mode="outlined"
          label="Expense Note"
          placeholder="Enter you Note"
          value={expenseNote}
          onChangeText={(Note) => setExpenseNote(Note)}
        />
        {/* <TextInput mode="outlined" label="Enter the tag" placeholder=" " value={tag} onChangeText={tag => setTag(tag)} /> */}
        <Picker
          mode="dropdown"
          label="Tag"
          selectedValue={tag}
          onValueChange={(itemValue) => {
            setTag(itemValue);
          }}
        >
          {tagData.map((item, index) => {
            return (
              <Picker.Item label={item.tag} value={item.tag} key={index} />
            );
          })}
        </Picker>

        {/*  ------------- Dropdown for income and expense --------------- */}
        <Picker
          mode="dropdown"
          label="Source"
          selectedValue={expenseSource}
          onValueChange={(itemValue) => {
            setSource(itemValue);
          }}
        >
          <Picker.Item label="Expense" value="Expense" />
          <Picker.Item label="Income" value="Income" />
        </Picker>

        {/* ----------------- Date Picker -------------------- */}
        <TextInput
          mode="outlined"
          label="Date"
          placeholder="ddmmyyyy"
          value={date}
          onChangeText={(date) => setDate(date)}
        />
        <Calendar
          monthFormat={"yyyy MM"}
          onDayPress={(day) => {
            setDate(day.dateString);
          }}
        />

        <View style={styles.btnArea}>
          <Button
            style={{ borderColor: "#F94A29" }}
            icon="close"
            textColor="#F94A29"
            mode="outlined"
            onPress={() => navigation.navigate("Expenses")}
          >
            Cancel
          </Button>
          <Button
            style={{
              marginLeft: 10,
              backgroundColor: "#F94A29",
            }}
            icon="file"
            mode="contained"
            onPress={() => {
              onClickAction();
            }}
          >
            {action.toUpperCase() === "ADD" ? "Add" : "Save"}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpenseFrom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  btnArea: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
});
