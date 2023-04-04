import React from "react"
import { View, StyleSheet, Dimensions, Text } from "react-native"
import { BarChart } from "react-native-chart-kit"

const UIBarCharts = ({ title, tagLabel, tagAmount }) => {
  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10
        }}
      >
        {title}
      </Text>
      <BarChart
        data={{
          labels: tagLabel,
          datasets: [
            {
              data: tagAmount
            }
          ]
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisLabel={""}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
          // style: {
          //   borderRadius: 16
          // }
        }}
        style={{
          // marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default UIBarCharts
