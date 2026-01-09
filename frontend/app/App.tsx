import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider } from './context/AuthContext';

import Calender from './Calender';
import Register from './Register';
import Home from './HomeScreen';
import Settings from './Settings';
import BottomNavBar , { NAV_BAR_HEIGHT } from '../components/BottomNavBar';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function MainTabs() {
  return(
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false,
        tabBarStyle: { height: NAV_BAR_HEIGHT + 20 },
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
    <AuthProvider>
    <SafeAreaProvider>
        <Stack.Navigator 
        screenOptions={{ 
          animation: 'none', // no animation
          headerShown: false,
        }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    </SafeAreaProvider>
    </AuthProvider>
  );
}