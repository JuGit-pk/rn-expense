import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Ionicons } from "react-native-vector-icons";

// Screen Import
import Home from "../screens/Home";
import Expenses from "../screens/Expenses";
import Settings from "../screens/Settings";
import Category from "../screens/Category";

// Tab Navigator
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ ...styles.home, ...styles.tabBarStyle, headerShown: false }}
      />
      <Tab.Screen
        name="Expenses"
        component={Expenses}
        options={{
          ...styles.Expenses,
          ...styles.tabBarStyle,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          ...styles.Category,
          ...styles.tabBarStyle,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          ...styles.setting,
          ...styles.tabBarStyle,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabBarStyle: {
    tabBarActiveTintColor: "#FCE22A",
    tabBarInactiveTintColor: "white",

    tabBarStyle: {
      backgroundColor: "#F94A29",
      borderTopColor: "#F94A29",
      borderTopWidth: 0,
      height: 80,
      paddingBottom: 20,
      paddingTop: 10,
    },
  },
  home: {
    tabBarIcon: (props) => {
      const { focused, color, size } = props;
      const iconName = focused ? "home" : "home-outline";
      return (
        <MaterialCommunityIcons name={iconName} color={color} size={size} />
      );
    },
  },
  Expenses: {
    tabBarIcon: (props) => {
      const { focused, color, size } = props;
      const iconName = focused
        ? "card-account-details"
        : "card-account-details-outline";
      return (
        <MaterialCommunityIcons name={iconName} color={color} size={size} />
      );
    },
  },

  Category: {
    tabBarIcon: (props) => {
      const { focused, color, size } = props;
      const iconName = focused ? "funnel" : "funnel-outline";
      return <Ionicons name={iconName} color={color} size={size} />;
    },
  },
  setting: {
    tabBarIcon: (props) => {
      const { focused, color, size } = props;
      const iconName = focused ? "settings" : "settings-outline";
      return <Ionicons name={iconName} color={color} size={size} />;
    },
  },
});
