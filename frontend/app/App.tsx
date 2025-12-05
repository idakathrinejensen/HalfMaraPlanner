import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Calender from './Calender';
import { Provider as PaperProvider } from 'react-native-paper';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="Calender">
        <Stack.Screen name="Calender" component={Calender} />
      </Stack.Navigator>
    </SafeAreaProvider>
    </PaperProvider>
  );
}