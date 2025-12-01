import { FlatList, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Calender = () => {
  const data = [
    { id: '1', title: 'Apple' },
    { id: '2', title: 'Banana' },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Hiiii</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </SafeAreaView>
  );
};

export default Calender;