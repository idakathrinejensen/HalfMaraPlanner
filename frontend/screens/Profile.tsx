import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const navigation = useNavigation<any>();
  const { user, logout, trainingPlan } = useAuth();

  const calculateStartDate = (raceDatestr: string, numWeeks: number) => {
  const raceDate = new Date(raceDatestr);
  
  // Calculate total days to subtract (weeks * 7 days)
  const daysToSubtract = numWeeks * 7;
  
  // Create a new date object for the start date
  const startDate = new Date(raceDate);
  startDate.setDate(raceDate.getDate() - daysToSubtract);
  
  return startDate;
};

const formatDate = (input: Date | string) => {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const startDate = trainingPlan?.raceDate && trainingPlan?.weeks
  ? calculateStartDate(trainingPlan.raceDate, trainingPlan.weeks)
  : null;

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.background} edges={["left", "right"]}>
        <Appbar.Header style={styles.appBar}>
            <Appbar.Content
              title="Profile"
              titleStyle={{
                fontSize: 30,
                fontWeight: "bold",
                lineHeight: 40,
                color: "#FFF",
              }}
            />
          </Appbar.Header>
        <ScrollView
          style={styles.background}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* PROFILE */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>ABOUT YOU</Text>
          </View>

          <View style={styles.card}>
            {/* top row */}
            <View style={styles.profileTopRow}>
              <View style={styles.avatar}>
                <Image source={require("../assets/icons/profile.png")} style={styles.avatarIcon} resizeMode="contain" />
              </View>
              <View style={styles.profileTextCol}>
                <Text style={styles.profileName}>{user?.fullName ?? "Runner"}</Text>
                <Text style={styles.profileEmail}>{user?.email ?? ""}</Text>
              </View>
            </View>

            {/* divider */}
            <View style={styles.divider} />

            {/* rows */}
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Experience Level</Text>
              <Text style={styles.cardValue}>{trainingPlan?.level}</Text>
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
                <Text style={styles.cardValue}>{startDate ? formatDate(startDate) : ""}</Text>
              </View>
            </View>

            <View style={styles.iconRow}>
              {/* trophy icon */}
              <Image source={require("../assets/icons/trophy_purple.png")} style={styles.purpleIcon} resizeMode="contain" />
              <View style={styles.iconRowText}>
                <Text style={styles.cardLabel}>Target Race Date</Text>
                <Text style={styles.cardValue}>{trainingPlan?.raceDate ? formatDate(trainingPlan?.raceDate) : ""}</Text>
              </View>
            </View>
          </View>

          {/* ABOUT */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>ABOUT US</Text>
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
              logout();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

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