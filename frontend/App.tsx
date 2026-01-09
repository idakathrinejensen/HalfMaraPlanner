import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Calender from './screens/Calender';
import Register from './screens/Register';
import Home from './screens/HomeScreen';
import Settings from './screens/Settings';
import Login from './screens/Login';
import BottomNavBar from './components/BottomNavBar';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function MainTabs() {
  return(
    <Tab.Navigator
      screenOptions={{ headerShown: false,
      }}
      tabBar={({ state, navigation}) =>{
        const routeKey = state.routes[state.index].name;
        return(
          <BottomNavBar
            activeTab={
              routeKey === "Calender"
                ? "calendar"
                : routeKey === "Settings"
                ? "settings"
                : "home"
            }
            onTabPress={(tabKey) =>{
              if (tabKey === "home") navigation.navigate("Home");
              if (tabKey === "calendar") navigation.navigate("Calender");
              if (tabKey === "settings") navigation.navigate("Settings");
            }}
          />
        );
      }}
    >
      <Tab.Screen name="Home" component={Home} />
       <Tab.Screen name="Calender" component={Calender} />
        <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (

    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ 
          animation: 'none', // no animation
          headerShown: false,
        }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}