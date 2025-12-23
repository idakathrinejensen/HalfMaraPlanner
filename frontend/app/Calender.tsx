import {
  Text,
  View,
  Image,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageSourcePropType } from "react-native";
import { Appbar } from "react-native-paper";
import { CheckBox } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";
//import BottomNavBar from "../components/BottomNavBar";


const Calender = () => {
  const navigation = useNavigation<any>();

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  type Item = {
    image: ImageSourcePropType;
    date: string;
    description: string;
    time?: string;
  };

  type ItemCardProps = {
    item: Item;
    isChecked: boolean;
    onCheck: (checked: boolean) => void;
  };

  const ItemCard = ({ item, isChecked, onCheck }: ItemCardProps) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <CheckBox
        checked={isChecked}
        onPress={() => onCheck(!isChecked)}
        iconType="material"
        checkedIcon="radio-button-checked"
        uncheckedIcon="radio-button-unchecked"
        checkedColor="#8B80F9"
        uncheckedColor="#6B7280"
      />
    </View>
  );

  const sections = [
    {
      title: "Week 1",
      data: [
        {
          date: "Wed, Nov 26",
          description: "Rest",
          image: require("../assets/images/Icons/green.png"),
        },
        {
          date: "Thu, Nov 27",
          description: "Easy - 5 km",
          image: require("../assets/images/Icons/grey.png"),
          time: "30 minutes",
        },
      ],
    },
    {
      title: "Week 2",
      data: [
        {
          date: "Wed, Nov 28",
          description: "Rest",
          image: require("../assets/images/Icons/green.png"),
        },
        {
          date: "Thu, Nov 30",
          description: "Easy - 5 km",
          image: require("../assets/images/Icons/grey.png"),
          time: "30 minutes",
        },
      ],
    },
  ];

  return (
    <View style={styles.root}>
    <SafeAreaView style={styles.background} edges={["left", "right", "bottom"]}>
      <Appbar.Header style={styles.appBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => console.log("Back pressed")}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Appbar.Content
          title="Training Calendar"
          titleStyle={{
            fontSize: 30,
            fontWeight: "bold",
            lineHeight: 40,
            color: "#FFF",
          }}
        />
      </Appbar.Header>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.date + index}
        renderItem={({ item, index }) => (
          <ItemCard
            item={item}
            isChecked={!!checkedItems[item.date + index]}
            onCheck={(value) =>
              setCheckedItems((prev) => ({
                ...prev,
                [item.date + index]: value,
              }))
            }
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
    {/* bottom nav bar - TO BE DELETED
          <BottomNavBar
            activeTab="calendar"
            onTabPress={(tabKey) => {
              if (tabKey === "home") navigation.navigate("Home");
              if (tabKey === "calendar") navigation.navigate("Calender");
              if (tabKey === "settings") navigation.navigate("Settings");
          }}
        /> */}
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#00171F", // screen background
  },
  background: {
    flex: 1,
  },
  backArrow: {
    fontSize: 20,
    color: "#FFF",
  },
  appBar: {
    backgroundColor: "#00000000",
    alignContent: "center",
    justifyContent: "center",
    height: 60,
    marginBottom: 28,
    paddingBottom: 15,
    borderBottomWidth: 1,       
    borderBottomColor: "#6B7280",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: "#FFFFFF1A",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },

  header: {
    marginLeft: 24,
    height: 28,
    marginBottom: 12,
    marginTop: 24,
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
    marginRight: 12,
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
  },
  checkbox: {
    alignItems: "flex-end",
    marginLeft: 12,
  },
});
