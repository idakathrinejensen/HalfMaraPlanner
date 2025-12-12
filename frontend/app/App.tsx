import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Calender from './Calender';
import Register from './Register';
import Home from './HomeScreen';
import Settings from './Settings';



const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <SafeAreaProvider>
      <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{ animation: 'none', // no animation
      }}
      >
        <Stack.Screen name="Calender" component={Calender} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </SafeAreaProvider>

  );
}