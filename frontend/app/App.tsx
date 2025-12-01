import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Calender from './Calender';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="Calender">
        <Stack.Screen name="Calender" component={Calender} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}