import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    return(
        <SafeAreaView style={styles.safeArea}>
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
                <View style={styles.settingsButton}/>
                </View>

                {/* training progress */}
                <View>
                    <View>
                      <View>
                          <Text>Training Progress</Text>
                          <Text>Week 1 of 12</Text>
                      </View>

                      <View>
                          <Text>0%</Text>
                          <Text>0/84 runs</Text>
                      </View>
                    </View>
                    <View></View>
                </View>
            </ScrollView>

            {/* todays workout */}
            <View>

            </View>

            {/* upcoming runs */}
            <View>

            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#00171F",
    }, 
    screen: {
        flex: 1,
    }, 
    contentContainer: {
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
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
    }

})

export default HomeScreen;