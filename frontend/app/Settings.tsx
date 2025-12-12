import {View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BottomNavBar from "../components/BottomNavBar";


const Settings = () => {
    const navigation = useNavigation<any>();
  
  return (
    <View style={styles.root}>
    <SafeAreaView style={styles.background} edges={["left", "right", "bottom"]}>
      
    </SafeAreaView>
    
      {/* bottom nav bar */}
          <BottomNavBar
            activeTab="settings"
            onTabPress={(tabKey) => {
              if (tabKey === "home") navigation.navigate("Home");
              if (tabKey === "calendar") navigation.navigate("Calender");
              if (tabKey === "settings") navigation.navigate("Settings");
          }}
        />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#00171F", // screen background
  },
  background: {
    flex: 1,
  },
});
