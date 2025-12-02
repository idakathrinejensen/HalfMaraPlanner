import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Calender from './Calender';
import Register from './Register';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="Calender">
        <Stack.Screen name="Calender" component={Calender} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}