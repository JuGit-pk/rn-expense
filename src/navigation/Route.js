import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "../context/ThemeContext";

// Screen Import
import Detail from "../screens/Detail";

// Nested Stack Navigator (Tab)
import Tabs from "./Tabs";

// Stack Navigator
const Stack = createNativeStackNavigator();
import { route } from "./PageRoutes";

export default function Route() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Navigation"
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
          {route.map((item, index) => {
            return (
              <Stack.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{
                  headerShown: false,
                }}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
