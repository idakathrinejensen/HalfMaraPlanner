import {
  Text,
  View,
  Image,
  SectionList,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageSourcePropType } from "react-native";
import { Appbar } from "react-native-paper";
import { useAuth} from "../context/AuthContext"

const Calender = () => {

  const [sections, setSections] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchTrainingPlan = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/user/${user.id}/training-plan`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch training plan");
        }

        const json = await res.json();
        const planSections = json.trainingPlan.sections;

     const getIcon = (iconName: string) => {
          switch (iconName) {
            case "green.png":
              return require("../assets/icons/green.png");
            case "grey.png":
              return require("../assets/icons/grey.png");
            case "orange.png":
              return require("../assets/icons/orange.png");
            case "purple.png":
              return require("../assets/icons/purple.png");
          }
        };

        const formattedSections = planSections.map((section: any) => ({
          title: section.title,
          data: section.data.map((item: any) => ({
            date: item.date,
            description: item.description,
            time: item.time,
            image: getIcon(item.image),
            complete: item.complete,
          })),
        }));

        setSections(formattedSections);
      } catch (err) {
        console.error("Error loading training plan:", err);
      } 
    };

    fetchTrainingPlan();
  }, [user]);

  type Item = {
    image: ImageSourcePropType;
    date: string;
    description: string;
    time?: string;
    complete: Boolean;
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
    {item.complete ? (
    <View style={styles.completedPill}>
      <Text style={styles.completedPillText}>✓ Completed</Text>
    </View>
  ) : null}
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
        renderItem={({ item }) => (
          <ItemCard
            item={item}
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
  completedPill: {
      position: "absolute",
      top: 16,
      right: 16,
      backgroundColor: "rgba(255,255,255,0.85)",
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
    },
    completedPillText: {
      color: "#00171F",
      fontSize: 14,
      fontWeight: "600",
    },
});
