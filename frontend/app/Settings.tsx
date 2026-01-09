import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

const Settings = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.background} edges={["left", "right", "bottom"]}>
        <ScrollView
          style={styles.background}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Appbar.Header style={styles.appBar}>
            <Appbar.Content
              title="Settings"
              titleStyle={{
                fontSize: 30,
                fontWeight: "bold",
                lineHeight: 40,
                color: "#FFF",
              }}
            />
          </Appbar.Header>

          {/* PROFILE */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>PROFILE</Text>
          </View>

          <View style={styles.card}>
            {/* top row */}
            <View style={styles.profileTopRow}>
              <View style={styles.avatar}>
                <Image source={require("../assets/icons/profile.png")} style={styles.avatarIcon} resizeMode="contain" />
              </View>
              <View style={styles.profileTextCol}>
                <Text style={styles.profileName}>Leonardo da Vinci</Text>
                <Text style={styles.profileEmail}>leo@polimi.it</Text>
              </View>
            </View>

            {/* divider */}
            <View style={styles.divider} />

            {/* rows */}
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Experience Level</Text>
              <Text style={styles.cardValue}>Beginner</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Current Week</Text>
              <Text style={styles.cardValue}>Week 1 of 12</Text>
            </View>
          </View>

          {/* TRAINING PLAN */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>TRAINING PLAN</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconRow}>
              {/* calendar icon */}
              <Image source={require("../assets/icons/calendar_purple.png")} style={styles.purpleIcon} resizeMode="contain" />

              <View style={styles.iconRowText}>
                <Text style={styles.cardLabel}>Start Date</Text>
                <Text style={styles.cardValue}>November 26, 2025</Text>
              </View>
            </View>

            <View style={styles.iconRow}>
              {/* trophy icon */}
              <Image source={require("../assets/icons/trophy_purple.png")} style={styles.purpleIcon} resizeMode="contain" />
              <View style={styles.iconRowText}>
                <Text style={styles.cardLabel}>Target Race Date</Text>
                <Text style={styles.cardValue}>June 21, 2026</Text>
              </View>
            </View>
          </View>

          {/* ABOUT */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>ABOUT</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.aboutTitle}>Half Marathon Trainer</Text>
            <Text style={styles.aboutBody}>
              Your personal training companion for conquering 21.1km. Built with weather-aware tips and
              personalized training plans.
            </Text>
          </View>

          {/* LOG OUT */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.logoutButton}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#00171F",
  },
  background: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 120,
  },
  appBar: {
    backgroundColor: "#00000000",
    alignContent: "center",
    justifyContent: "center",
    height: 60,
    marginBottom: 28,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "200",
    letterSpacing: 0.3,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    padding: 16,
    gap: 12,
    marginBottom: 32,
  },

  profileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: "#8B80F9",
    alignItems: "center",
    justifyContent: "center",
  },
  profileTextCol: {
    flex: 1,
  },
  profileName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
  },
  profileEmail: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 16,
    fontWeight: "400",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLabel: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
  },
  cardValue: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  smallIconWrap: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconRowText: {
    flex: 1,
    gap: 2,
  },

  aboutTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
  },
  aboutBody: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 26,
  },

  logoutButton: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  logoutIconWrap: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },

  noteWrap: {
    alignItems: "center",
    gap: 4,
    paddingTop: 8,
  },
  noteText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 26,
    opacity: 0.95,
  }, 
  avatarIcon: {
  width: 24,
  height: 24,
  tintColor: "#FFFFFF", // remove if your asset already is white
},
purpleIcon: {
  width: 24,
  height: 24,
  tintColor: "#8B80F9", // remove if your asset already is white
},
});