import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = [
  { key: "home", label: "Home", icon: require("../assets/icons/home.png") },
  { key: "calendar", label: "Calendar", icon: require("../assets/icons/calendar.png") },
  { key: "profile", label: "profile", icon: require("../assets/icons/profile.png") },
];

const BottomNavBar = (
    { activeTab = "home", 
      onTabPress 
    }: {
        activeTab?: string;
        onTabPress?: (tabKey: string) => void;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
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
    height: 110,
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