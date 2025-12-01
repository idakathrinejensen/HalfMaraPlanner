import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomNavBar from "../components/BottomNavBar";


const HomeScreen = () => {
    return(
      <View style={styles.root}>   
        <SafeAreaView 
          style={styles.safeArea}
          edges={["top"]}> {/* only for top, want room for bottomNavBar */}
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
                    source={require("../../assets/icons/setting.png")}
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

                      <View style={{ alignItems: "flex-end" }}> {/*right align */}
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
              <View style={{marginBottom:24}}>
                <Text style={styles.todayType}>REST RUN</Text>
                <Text style={styles.todayDistance}>5 km</Text>
                <Text style={styles.todayTime}>24 minutes</Text>
              </View>

              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Get Pre-Run Tips</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Mark as Complete</Text>
              </TouchableOpacity>
            </View>

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
        {/* bottom nav bar */}
          <BottomNavBar
            activeTab="home"
            onTabPress={(tabKey) => {
              console.log("Pressed tab:", tabKey); // later: use router.push("/calendar") etc.
          }}
        />
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






