import React, { useEffect, useState } from "react";
import {
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

const Expenses = (props) => {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [tag, setTag] = useState([]);
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

  return (
    <View style={styles.container}>
      <ScrollView style={form.view}>
        <ExpenseList
          data={data}
          tagData={tag}
          deleteExpense={deleteExpense}
          navigation={navigation}
        />
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
    },
    bold: {
      fontWeight: "bold",
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
