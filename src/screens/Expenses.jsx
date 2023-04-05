import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import form from "../styles/Form.js";
import { useFocusEffect } from "@react-navigation/native";
// database functions
import {
  dbInitExpense,
  dbGetExpenses,
  dbDeleteExpense,
  dropTableexpense,
} from "../database/ExpenseTable";
import ExpenseList from "../components/expense/ExpenseList.jsx";
import { dbGetTag } from "../database/CategoryTable.js";
import { useTheme } from "../context/ThemeContext.js";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";

const Expenses = (props) => {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [enteredDate, setEnteredDate] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [tag, setTag] = useState([]);
  const [sortOption, setSortOption] = useState("oldest");
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Refresh data
  const refreshVal = () => {
    dbGetExpenses()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log("Database error", err);
      })
      .finally(() => {
        console.log("Database initialized");
      });
  };

  // Init db
  useFocusEffect(
    React.useCallback(() => {
      dbInitExpense()
        .then(() => dbGetExpenses())
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          console.log("Databae error", err);
        })
        .finally(() => {
          console.log("Database initialized");
        });

      dbGetTag()
        .then((data) => {
          setTag(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });

      // Do something when the screen is focused
      return () => {
        console.log("Screen was unfocused");
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const deleteExpense = (id) => {
    dbDeleteExpense(id)
      .then(() => {
        console.log("Expense deleted");
        refreshVal();
      })
      .catch((err) => {
        console.log("Error deleting expense", err);
      });
  };
  const handleSortChange = (value) => {
    setSortOption(value); // update sort option state
  };
  const sortExpenses = () => {
    let sortedData = [...filteredData];
    sortedData.sort((a, b) => {
      const dateA = new Date(a.expenseDate);
      const dateB = new Date(b.expenseDate);
      if (sortOption === "newest") {
        return dateB - dateA;
      } else if (sortOption === "oldest") {
        return dateA - dateB;
      }
    });
    setFilteredData(sortedData);
  };
  // const filterExpensesByDate = () => {
  //   console.log("enteredDate", enteredDate);
  //   console.log("THIS", new Date(enteredDate).toISOString().slice(0, 10));
  //   let filteredDataByDate = data.filter((expense) => {
  //     if (enteredDate === "") {
  //       return false;
  //     } else {
  //       const enteredDateObj = new Date(enteredDate);
  //       const expenseDateObj = new Date(expense.expenseDate);
  //       return (
  //         enteredDateObj.toISOString().slice(0, 10) ===
  //         expenseDateObj.toISOString().slice(0, 10)
  //       );
  //     }
  //   });
  //   setFilteredData(filteredDataByDate);
  // };

  const filterExpensesByDate = () => {
    let filteredDataByDate = data.filter((expense) => {
      console.log("X", expense.expenseDate);
      console.log("Y", enteredDate);
      if (enteredDate === "") {
        setFilteredData(data);
        return true;
      } else {
        // Validate date format
        const dateFormats = [
          "DD/MM/YY",
          "DD-MM-YY",
          "DD,MM,YY",
          "MM/DD/YY",
          "MM-DD-YY",
          "MM,DD,YY,",
          "DD/MM/YYYY",
          "DD-MM-YYYY",
          "DD,MM,YYYY,",
          "DD/MM/YYYY",
          "DD-MM-YYYY",
          "DD,MM,YYYY,",
          "MM/DD/YYYY",
          "MM-DD-YYYY",
          "MM,DD,YYYY,",
          "YYYY/MM/DD",
          "YYYY-MM-DD",
          "YYYY,MM,DD,",
          "YYYY/MM/DD",
          "YYYY-MM-DD",

          "YYYY,DD,MM,",
          "YYYY/DD/MM",
          "YYYY-DD-MM",
        ]; // Add more date formats if needed
        let isValidFormat = false;
        let enteredDateObj;
        for (let format of dateFormats) {
          enteredDateObj = moment(enteredDate, format, true);
          if (enteredDateObj.isValid()) {
            isValidFormat = true;
            break;
          }
        }
        if (!isValidFormat) {
          return false;
        }
        // 2023-04-13

        // Parse expense date using Moment.js
        const expenseDateObj = moment(expense.expenseDate, "YYYY-MM-DD", true);
        // Compare two dates
        return enteredDateObj.isSame(expenseDateObj, "day");
      }
    });
    setFilteredData(filteredDataByDate);
  };

  console.log("sortOption", sortOption);

  useEffect(() => {
    setFilteredData(data);
  }, [data]); // Include filteredData as a dependency

  useEffect(() => {
    sortExpenses();
  }, [sortOption]); // Include filteredData as a dependency
  // console.log("filteredData", filteredData);
  // console.log("data", data);
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Picker
          style={{ height: 50, width: 150 }}
          selectedValue={sortOption}
          onValueChange={handleSortChange}
        >
          <Picker.Item label="Newest" value="newest" />
          <Picker.Item label="Oldest" value="oldest" />
        </Picker>
        <View style={styles.dateControl}>
          <TextInput
            onChangeText={(text) => {
              console.log(text);
              setEnteredDate(text);
            }}
            keyboardType="numeric"
            value={enteredDate}
            placeholder="YYYY-MM-DD"
            style={styles.dateField}
          />
          {/* x button */}

          <TouchableOpacity
            onPress={() => {
              setEnteredDate("");
              setFilteredData(data);
            }}
          >
            <Text style={styles.xButton}>X</Text>
          </TouchableOpacity>

          {/* add a button to call filterdatebydate */}
          <TouchableOpacity onPress={filterExpensesByDate}>
            <Text style={styles.dateButton}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={form.view}>
        {filteredData.length > 0 ? (
          <ExpenseList data={filteredData} onDelete={deleteExpense} />
        ) : (
          <Text style={styles.emptyText}>No expenses found</Text>
        )}
      </ScrollView>

      <Button
        icon="plus"
        style={styles.fab}
        textColor="#FFF"
        onPress={() =>
          navigation.navigate("ExpenseForm", {
            action: "Add",
          })
        }
      >
        Add Expense
      </Button>
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
      paddingTop: Platform.OS === "android" ? 25 : 0,
    },
    bold: {
      fontWeight: "bold",
    },
    controls: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: 20,
    },
    dateField: {
      width: 150,
    },
    dateControl: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: 20,
    },
    dateButton: {
      backgroundColor: "#F94A29",
      color: "#FFF",
      padding: 10,
      borderRadius: 5,
    },

    fab: {
      backgroundColor: "#F94A29",
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
    xButton: {
      backgroundColor: "#F94A29",
      color: "#FFF",
      borderRadius: 50,
      textAlign: "center",
      width: 30,
      height: 30,
      paddingTop: 5,
      marginLeft: 10,
    },
  });

export default Expenses;
