import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const TABS = [
  { key: "home", label: "Home", icon: require("../assets/icons/home.png") },
  { key: "calendar", label: "Calendar", icon: require("../assets/icons/calendar.png") },
  { key: "settings", label: "Settings", icon: require("../assets/icons/setting.png") },
];

const BottomNavBar = (
    { activeTab = "home", onTabPress }: {
        activeTab?: string;
        onTabPress?: (tabKey: string) => void;
}) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => onTabPress && onTabPress(tab.key)}
          >
            <View
              style={[
                styles.iconWrapper,
                isActive && styles.iconWrapperActive,
              ]}
            >
              <Image
                source={tab.icon}
                style={[
                  styles.icon,
                  isActive && styles.iconActive,
                ]}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#17192A",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 32,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",

  },
  tab: {
    alignItems: "center",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.05)", // 5% opacity
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  iconWrapperActive: {
    backgroundColor: "#8B80F9",
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: "#CCCCCC",
  },
  iconActive: {
    tintColor: "#FFFFFF",
  },
  label: {
    color: "#CCCCCC",
    fontSize: 12,
  },
  labelActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default BottomNavBar;