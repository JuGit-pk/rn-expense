import { Text, Dimensions } from "react-native"
import { PieChart } from "react-native-chart-kit"

const UIPieChart = props => {
  return (
    <>
      <Text
        style={{
          fontWeight: "bold"
        }}
      >
        {props.title}
      </Text>
      <PieChart
        data={[
          {
            name: "$ Income",
            population: props.totalIncome[0] ?? 0,
            color: "#BFDB38",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "$ Expense",
            population: props.totalExpense[0] ?? 0,
            color: "#F94A29",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          }
        ]}
        width={Dimensions.get("window").width - 16}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="10"
        absolute //for the absolute number remove if you want percentage
      />
    </>
  )
}

export default UIPieChart
