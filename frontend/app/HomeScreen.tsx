import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import React, { useState } from "react";
import * as Location from "expo-location";

//import BottomNavBar from "../components/BottomNavBar";
import { useNavigation } from "@react-navigation/native";

import { fetchWeatherByCoords, WeatherDTO } from "../scripts/weatherService";
import { generateTips, Tips } from "../scripts/tips";


const HomeScreen = () => {
  const navigation = useNavigation<any>();

  // pre-run tips states
  const [tipsVisible, setTipsVisible] = useState(false);
  const [weather, setWeather] = useState<WeatherDTO | null>(null);
  const [tips, setTips] = useState<Tips | null>(null);
  const [loadingTips, setLoadingTips] = useState(false);
  const [tipsError, setTipsError] = useState<string | null>(null);

  // completed state
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
   
  async function onPressPreRunTips() {
  try {
    setLoadingTips(true);
    setTipsError(null);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Location permission denied");
    }

    const pos = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = pos.coords;

    const w = await fetchWeatherByCoords(latitude, longitude);

    // Fixed city; later replace with user's location/city setting
    //const w = await fetchWeatherByCity("Milan");
    
    setWeather(w);
    setTips(generateTips(w));
    setTipsVisible(true);
  } catch (e: any) {
    setTipsError(e?.message ?? "Could not load tips.");
  } finally {
    setLoadingTips(false);
  }
}

function onPressMarkAsComplete() {
  setWorkoutCompleted(true);
  setTipsVisible(false); // hide pre-run tips
}


    return(
      <View style={styles.root}>   
        <SafeAreaView 
          style={styles.safeArea}
          edges={["top"]}>     
          {/* only for top, want room for bottomNavBar */}
          
            <ScrollView
                style={styles.screen}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                >
                {/* header */}
                <View style={styles.headerRow}>
                  <View>
                    <Text style={styles.greeting}>Good morning,</Text>
                    <Text style={styles.name}>Leonardo da Vinci</Text>
                </View>
                <TouchableOpacity style={styles.settingsButton}>
                  <Image
                    source={require("../assets/icons/setting.png")}
                    resizeMode="contain"
                    />
                    </TouchableOpacity>
                </View>

                {/* training progress */}
                <View style={styles.progressCard}>
                    <View style={styles.progressHeaderRow}>
                      <View>
                          <Text style={styles.progressLabel}>Training Progress</Text>
                          <Text style={styles.progressSubLabel}>Week 1 of 12</Text>
                      </View>

                      <View style={{ alignItems: "flex-end" }}>
                          <Text style={styles.progressPercent}>0%</Text>
                          <Text style={styles.progressRuns}>0/84 runs</Text>
                      </View>
                      </View>

                    <View style={styles.progressBarBackground}>
                    <View style={styles.progressBarFill}/>
                    </View>
                </View>

            {/* todays workout */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Today's Workout</Text>
            </View>

            <View style={styles.todayCard}>
              {workoutCompleted ? (
                <View style={styles.completedPill}>
                <Text style={styles.completedPillText}>✓ Completed</Text>
                </View>
              ) : null}
              <View style={{marginBottom:24}}>
                <Text style={styles.todayType}>REST RUN</Text>
                <Text style={styles.todayDistance}>5 km</Text>
                <Text style={styles.todayTime}>24 minutes</Text>
              </View>

              <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => {
                if (tipsVisible) setTipsVisible(false);
                else onPressPreRunTips();
              }}
              disabled={loadingTips || workoutCompleted}
              >
                {loadingTips ? (
                  <ActivityIndicator/>
                ) : (
                <Text style={styles.primaryButtonText}>
                  {workoutCompleted ? "Workout Completed" : tipsVisible ? "Hide Tips" : "Get Pre-Run Tips"}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.secondaryButton, workoutCompleted && styles.secondaryButtonCompleted]}
                onPress={onPressMarkAsComplete}
                disabled={workoutCompleted}
                >
                <Text style={styles.secondaryButtonText}>
                  {workoutCompleted ? "Completed" : "Mark as Complete"}
                  </Text>
              </TouchableOpacity>
            </View>

            {/* Completed run text*/}
              {workoutCompleted ? (
                <View style={styles.completedCard}>
                  <Text style={styles.completedTitle}>Great job completing your run!</Text>

                  <Text style={styles.completedSubtitle}>Don't forget to:</Text>

                  <Text style={styles.completedBullet}>• Stretch for 10–15 minutes</Text>
                  <Text style={styles.completedBullet}>• Hydrate and refuel</Text>
                  <Text style={styles.completedBullet}>• Log how you felt during the run</Text>
                </View>
              ) : null}

          {tipsError ? <Text style={styles.errorText}>{tipsError}</Text> : null}

          {tipsVisible && weather && tips ? (
            <>
              {/* Current Weather */}
              <View style={styles.infoCard}>
                <Text style={styles.infoCardTitle}>Current Weather</Text>

                <View style={styles.infoRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoLabel}>Temperature</Text>
                    <Text style={styles.infoValue}>{weather.temperatureC}°C</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoLabel}>Conditions</Text>
                    <Text style={styles.infoValue}>{weather.condition}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoMeta}>💧 {weather.humidity}%</Text>
                  <Text style={styles.infoMeta}>💨 {weather.windSpeedKmh} km/h</Text>
                  <Text style={styles.infoMeta}>
                    🌧️ {weather.precipitationProbability ?? 0}%
                  </Text>
                </View>

                {/* optional extra line if you want */}
                {weather.rainMmLastHour > 0 ? (
                  <Text style={styles.infoMeta}>Rain last hour: {weather.rainMmLastHour} mm</Text>
                ) : null}
              </View>

              {/* Clothing */}
              <View style={styles.tipCard}>
                <Text style={styles.tipTitle}>Clothing</Text>
                <Text style={styles.tipText}>{tips.Clothing}</Text>
              </View>

              {/* Hydration */}
              <View style={styles.tipCard}>
                <Text style={styles.tipTitle}>Hydration</Text>
                <Text style={styles.tipText}>{tips.Hydration}</Text>
              </View>

              {/* Energy */}
              <View style={styles.tipCard}>
                <Text style={styles.tipTitle}>Energy</Text>
                <Text style={styles.tipText}>{tips.Energy}</Text>
              </View>
            </>
          ) : null}



            {/* upcoming runs */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Upcoming Runs</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.runsList}>
              {[
                { day: "Tue, Nov 25", title: "EASY - 5 km", time: "30 min"},
                { day: "Thu, Nov 27", title: "REST - 3 km", time: "17 min"},
                { day: "Sat, Nov 29", title: "TEMPO - 6 km", time: "32 min"},
              ]. map((run)=> (
                <TouchableOpacity key={run.day} style={styles.runCard}>
                <View>
                  <Text style={styles.runDay}>{run.day}</Text>
                  <Text style={styles.runTitle}>{run.title}</Text>
                </View>
                <Text style={styles.runTime}>{run.time}</Text>
              </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
        {/* bottom nav bar - TO BE DELETED
          <BottomNavBar
            activeTab="home"
            onTabPress={(tabKey) => {
              if (tabKey === "home") navigation.navigate("Home");
              if (tabKey === "calendar") navigation.navigate("Calender");
              if (tabKey === "settings") navigation.navigate("Settings");
            }}
        /> */}
      </View>
    )
};

const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: "#00171F", // screen background
    },
    safeArea: {
        flex: 1,
    }, 
    screen: {
        flex: 1,
    }, 
    contentContainer: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        paddingBottom: 120,
    },

    //header
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
    },
    greeting: {
      color: "#FFFFFF",
      fontSize: 16,
    },
    name: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "600",
      marginTop: 2
    },
    settingsButton: {
      width: 38,
      height: 38,
      borderRadius: 16,
      backgroundColor: "rgba(255,255,255,0.1)", // 10% opacity
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.2)", // 20% opacity
      justifyContent: "center", // center icon
      alignItems: "center", // center icon
    },

    // training progress
    progressCard: {
      backgroundColor: "rgba(255,255,255,0.05)", // 5% opacity
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.1)",  // 10% opacity
      padding: 20,
      marginBottom: 24,
    },
    progressHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    progressLabel: {
      color: "#FFFFFF",
      fontSize: 16,
    },
    progressSubLabel: {
      color: "#FFFFFF",
      fontSize: 16,
      marginTop: 4,
    },
    progressPercent: {
      color: "#8B80F9",
      fontSize: 16,
    },
    progressRuns: {
      color: "#FFFFFF",
      fontSize: 16,
      marginTop: 4,
    },
    progressBarBackground: {
      height: 8,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.1)", // 10% opacity
    },
    progressBarFill: {
      height: "100%",
      width: "0%",
      borderRadius: 999,
      backgroundColor: "#8B80F9",
    },

    // sections
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
      fontWeight: "600",
    },

    // today's workout
    todayCard: {
      borderRadius: 16,
      borderWidth: 2,
      borderColor: "#8B80F9",
      backgroundColor: "rgba(139,128,249,0.1)", // 10% opacity
      padding: 24,
      marginBottom: 24,
      position: "relative",
    },
    todayType: {
      color: "#FFFFFF",
      fontSize: 16,
      marginBottom: 4,
    },
    todayDistance: {
      color: "#FFFFFF",
      fontSize: 16,
      marginBottom: 4,
    },
    todayTime: {
      color: "#FFFFFF",
      fontSize: 16,
    },
    primaryButton: {
      marginTop: 8,
      height: 48,
      borderRadius: 16,
      backgroundColor: "#8B80F9",
      justifyContent: "center",
      alignItems: "center",
    },
    primaryButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "500",
    },
    secondaryButton: {
      marginTop: 12,
      height: 50,
      borderRadius: 16,
      backgroundColor: "rgba(255,255,255,0.1)", // 10% opacity
      borderWidth: 1, 
      borderColor: "rgba(255,255,255,0.2)",// 20% opacity
      justifyContent: "center",
      alignItems: "center",
    },
    secondaryButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "500",
    },
    errorText: {
      color: "#FFFFFF", 
      marginBottom: 12,
    },

    //completed
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

    secondaryButtonCompleted: {
      backgroundColor: "rgba(255,255,255,0.08)",
      borderColor: "rgba(255,255,255,0.25)",
    },

    completedCard: {
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.2)",
      padding: 16,
      marginBottom: 24,
    },
    completedTitle: {
      color: "#FFF7D6",
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 12,
    },
    completedSubtitle: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 10,
    },
    completedBullet: {
      color: "#FFFFFF",
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 6,
    },

    // weather + tips cards
    infoCard: {
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      padding: 16,
      marginBottom: 12,
    },
    infoCardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    infoLabel: {
      color: "rgba(255,255,255,0.7)",
      fontSize: 14,
      marginBottom: 4,
    },
    infoValue: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "500",
    },
    infoMeta: {
      color: "#FFFFFF",
      fontSize: 14,
      marginRight: 12,
    },
    tipCard: {
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.1)",
      padding: 16,
      marginBottom: 12,
    },
    tipTitle: {
      color: "rgba(255,255,255,0.75)",
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
    },
    tipText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 22,
    },

    // upcoming runs
    linkText: {
      color: "#8B80F9",
      fontSize: 16,
      fontWeight: "500",
    },
    runsList: {
      gap: 8,
      marginBottom: 32,
    },
    runCard: {
      backgroundColor: "rgba(255,255,255,0.05)", // 5% opacity
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.1)", // 10% opacity
      paddingHorizontal: 16,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    runDay: {
      color: "#FFFFFF",
      fontSize: 16,
      marginBottom: 4,
    },
    runTitle: {
      color: "#FFFFFF",
      fontSize: 16,
    },
    runTime: {
      color: "#FFFFFF",
      fontSize: 14,
    },
});

export default HomeScreen;






