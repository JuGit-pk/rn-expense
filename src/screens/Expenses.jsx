import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
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

const Expenses = (props) => {
  const { navigation } = props;
  const [data, setData] = useState([]);
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
    let sortedData = [...data];
    sortedData.sort((a, b) => {
      const dateA = new Date(a.expenseDate);
      const dateB = new Date(b.expenseDate);
      if (sortOption === "newest") {
        return dateB - dateA;
      } else if (sortOption === "oldest") {
        return dateA - dateB;
      }
    });
    setData(sortedData);
    return sortedData;
  };

  useEffect(() => {
    sortExpenses();
  }, [sortOption]);

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
      </View>

      <ScrollView style={form.view}>
        {data.length > 0 ? (
          <ExpenseList data={data} onDelete={deleteExpense} />
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
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: 20,
    },
    fab: {
      backgroundColor: "#F94A29",
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });

export default Expenses;
