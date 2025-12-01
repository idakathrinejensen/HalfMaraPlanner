import { Text, View, Image, SectionList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageSourcePropType } from "react-native";

const Calender = () => {
  type Item = {
    image: ImageSourcePropType;
    date: string;
    description: string;
    time?: string;
  };

  type ItemCardProps = {
    item: Item;
  };

  const ItemCard = ({ item }: ItemCardProps) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  const sections = [
    {
      title: "Week 1",
      data: [
        {
          date: "wed 18 nov",
          description: "Rest",
          image: require("../assets/images/Icons/green.png"),
        },
        {
          date: "wed 20 nov",
          description: "Easy - 5 km",
          image: require("../assets/images/Icons/grey.png"),
          time: "30 minutes"
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.background}>
      <SectionList
        sections={sections}
        renderItem={({ item }) => <ItemCard item={item} />}
        keyExtractor={(item, index) => item.date + index}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Calender;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#00171F",
  },

  header: {
    marginLeft: 24,
    height: 28,
    marginBottom: 12,
  },

  headerText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Inter",
    fontWeight: 600,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 8,
    padding: 17,
    height: 94,
    borderColor: "#FFFFFF1A",
    borderRadius: 16,
    borderWidth: 1,
  },

  image: {
    height: 48,
    width: 4,
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  text: {
    color: "#FFF",
    fontFamily: "Inter",
  },

  date: {
    color: "#FFF",
    opacity: 0.7,
    marginBottom: 4,
  },
  time: {
    color: "#FFF",
    opacity: 0.7,
    marginTop: 4,
  }
});
