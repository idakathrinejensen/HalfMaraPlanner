import {
  Text,
  View,
  Image,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageSourcePropType } from "react-native";
import { Appbar } from "react-native-paper";
import { CheckBox } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

const Calender = () => {
  const navigation = useNavigation<any>();

  const [sections, setSections] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      try {
        const res = await fetch(
          "http://192.168.1.42:3000/api/training-plan?raceDate=2026-04-01&level=beginner&weeks=8"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch training plan");
        }

        const plan = await res.json();

        const getIcon = (iconName: string) => {
          switch (iconName) {
            case "green.png":
              return require("../assets/images/Icons/green.png");
            case "grey.png":
              return require("../assets/images/Icons/grey.png");
            case "yellow.png":
              return require("../assets/images/Icons/yellow.png");
            case "red.png":
              return require("../assets/images/Icons/red.png");
          }
        };

        const formattedSections = plan.map((section: any) => ({
          title: section.title,
          data: section.data.map((item: any) => ({
            date: item.date,
            description: item.description,
            time: item.time,
            image: getIcon(item.image),
          })),
        }));

        setSections(formattedSections);
      } catch (err) {
        console.error("Error loading training plan:", err);
      } 
    };

    fetchTrainingPlan();
  }, []);

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
  
  return (
    <View style={styles.root}>
    <SafeAreaView style={styles.background} edges={["left", "right", "bottom"]}>
      <Appbar.Header style={styles.appBar}>
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
