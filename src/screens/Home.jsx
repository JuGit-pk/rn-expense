import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import UIBarCharts from "../components/charts/BarCharts";
import UIPieChart from "../components/charts/PieChart";
import { dbGetTag } from "../database/CategoryTable";
import { useTheme } from "../context/ThemeContext";
import {
  dbGetExpensesByMonthYear,
  dbGetTotalIncomeByMonthYear,
  dbGetTotalExpenseByMonthYear,
  dbGetTotalBalanceByMonthYear,
} from "../database/ExpenseTable";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";

const Home = (props) => {
  const { navigation } = props;

  const [totalIncome, setTotalIncome] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [averageExpense, setAverageExpense] = useState("");
  const [selectedMonth, setSelectedMonth] = useState({
    number: moment().format("MM"), // Default to current month
    name: moment().format("MMMM"),
  });
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY")); // Default to current year

  const [expenses, setExpenses] = useState([]);
  const [tag, setTag] = useState([]);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    const onFocus = () => {
      dbGetExpensesByMonthYear(+selectedYear, +selectedMonth.number)
        .then((data) => {
          console.log("data is: " + data);
          setExpenses(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });

      dbGetTotalIncomeByMonthYear(+selectedYear, +selectedMonth.number)
        .then((data) => {
          console.log("GG", data);
          setTotalIncome(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });

      dbGetTotalExpenseByMonthYear(+selectedYear, +selectedMonth.number)
        .then((data) => {
          console.log("TTX", data);
          setTotalExpense(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });

      dbGetTotalBalanceByMonthYear(+selectedYear, +selectedMonth.number)
        .then((data) => {
          console.log("TTB", data);
          setTotalBalance(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });

      dbGetTag()
        .then((data) => {
          setTag(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    };

    const unsubscribeFocus = navigation.addListener("focus", onFocus);
    onFocus();

    return () => {
      unsubscribeFocus();
    };
  }, [selectedYear, selectedMonth.number, navigation]);

  let tagLabel = [];

  tag.filter((item, i) => {
    tagLabel.push(item.tag);
  });
  // calculating tag amount and storing as an array
  let tagAmount = [];
  tag.filter((item, i) => {
    let amount = 0;
    expenses.filter((expense, i) => {
      if (item.tag === expense.expenseTag) {
        amount += Number(expense.expenseAmount);
      }
    });
    tagAmount.push(amount);
  });
  // other hooks and functions...

  const handleSetMonth = (monthNumber) => {
    const monthName = moment()
      .month(monthNumber - 1)
      .format("MMMM");

    setSelectedMonth({
      number: monthNumber,
      name: monthName,
    });
  };

  const monthNames = [...Array(12).keys()].map((i) =>
    moment().month(i).format("MM")
  );

  console.log("monthNames", monthNames);
  console.log("LL", selectedYear, selectedMonth.name);
  console.log(
    "XX",

    expenses
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={styles.headerText}>Hi John Doe</Text>
          <Image
            style={{
              width: 25,
              height: 25,
              marginLeft: 10,
            }}
            source={require("../assets/icons/goodbye.png")}
          />
        </View>
        <Text style={styles.headerP}>
          Welcome to the Expense tracker dashboard. You can track your expenses
          here!{" "}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.monField}>
          <Picker
            style={{ height: 50, width: 150 }}
            selectedValue={selectedMonth.number}
            onValueChange={handleSetMonth}
          >
            {monthNames.map((monthNumber, i) => {
              const monthName = moment()
                .month(monthNumber - 1)
                .format("MMMM");
              return (
                <Picker.Item label={monthName} value={monthNumber} key={i} />
              );
            })}
          </Picker>
          <Picker
            style={{ height: 50, width: 150 }}
            selectedValue={selectedYear}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedYear(itemValue);
            }}
          >
            <Picker.Item label="2022" value="2022" />
            <Picker.Item label="2023" value="2023" />
            <Picker.Item label="2024" value="2024" />
          </Picker>
        </View>
        {expenses.length > 0 ? (
          <>
            <View style={styles.pieChart}>
              <UIPieChart
                title="Summary"
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                totalBalance={totalBalance}
              />
            </View>
            <View style={styles.barChart}>
              <UIBarCharts
                title={"Category wise summary"}
                tagLabel={tagLabel}
                tagAmount={tagAmount}
              />
            </View>
          </>
        ) : (
          <View style={styles.noData}>
            <Text style={styles.bold}>No data available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: 50,
    },
    headerText: {
      color: theme?.colors?.text,
      fontSize: 18,
      fontWeight: "bold",
    },
    bold: {
      fontWeight: "bold",
    },
    headerP: {
      color: theme?.colors?.text,
      fontSize: 14,
    },
    headerContainer: {
      padding: 10,
      margin: 10,
      backgroundColor: "#F94A29",

      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    pieChart: {
      backgroundColor: theme?.colors?.background,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    barChart: {
      backgroundColor: theme?.colors?.background,
      padding: 10,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    dateControl: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      margin: 10,
    },
    monField: {
      backgroundColor: theme?.colors?.background,
      padding: 10,
      borderRadius: 10,
      width: "100%",
    },
    noData: {
      backgroundColor: theme?.colors?.background,
      padding: 10,
      borderRadius: 10,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default Home;
