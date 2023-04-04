import { useFocusEffect } from "@react-navigation/native"
import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import UIBarCharts from "../components/charts/BarCharts"
import UIPieChart from "../components/charts/PieChart"
import { dbGetTag } from "../database/CategoryTable"

import { dbGetExpenses, dbGetTotalBalance, dbGetTotalExpense, dbGetTotalIncome, dropTableexpense } from "../database/ExpenseTable"

const Home = props => {
  const { navigation } = props

  const [totalIncome, setTotalIncome] = useState("")
  const [totalExpense, setTotalExpense] = useState("")
  const [totalBalance, setTotalBalance] = useState("")
  const [averageExpense, setAverageExpense] = useState("")

  const [expenses, setExpenes] = useState([])
  const [tag, setTag] = useState([])

  useFocusEffect(
    useCallback(() => {
      dbGetTotalIncome()
        .then(data => {
          setTotalIncome(data)
        })
        .catch(err => {
          console.log("Error", err)
        })

      dbGetTotalExpense()
        .then(data => {
          setTotalExpense(data)
        })
        .catch(err => {
          console.log("Error", err)
        })

      dbGetTotalBalance()
        .then(data => {
          setTotalBalance(data)
        })
        .catch(err => {
          console.log("Error", err)
        })

      dbGetExpenses()
        .then(data => {
          setExpenes(data)
        })
        .catch(err => {
          console.log("Error", err)
        })

      dbGetTag()
        .then(data => {
          setTag(data)
        })
        .catch(err => {
          console.log("Error", err)
        })

      // dropTable()
      // dropTableexpense()
    }, [])



  )

  let tagLabel = []

  tag.filter((item, i) => {
    tagLabel.push(item.tag)
  })
  // calculating tag amount and storing as an array
  let tagAmount = []
  tag.filter((item, i) => {
    let amount = 0
    expenses.filter((expense, i) => {
      if (item.tag === expense.expenseTag) {
        amount += Number(expense.expenseAmount)
      }
    })
    tagAmount.push(amount)
  })

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Text style={styles.headerText}>Hi John Doe</Text>
          <Image
            style={{
              width: 25,
              height: 25,
              marginLeft: 10
            }}
            source={require("../assets/icons/goodbye.png")}
          />
        </View>
        <Text style={styles.headerP}>Welcome to the Expense tracker dashboard. You can track your expenses here! </Text>
      </View>
      <ScrollView>
        <View style={styles.pieChart}>
          <UIPieChart title="Summary" totalIncome={totalIncome} totalExpense={totalExpense} totalBalance={totalBalance} />
        </View>
        <View style={styles.barChart}>
          <UIBarCharts title={"Category wise summary"} tagLabel={tagLabel} tagAmount={tagAmount} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  },
  bold: {
    fontWeight: "bold"
  },
  headerP: {
    color: "#FFF",
    fontSize: 14
  },
  headerContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: "#F94A29",

    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  pieChart: {
    backgroundColor: "#FFF",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  barChart: {
    backgroundColor: "#FFF",
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
})

export default Home
