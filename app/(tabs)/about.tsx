import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Text, View } from "react-native";

const AnnoyingBackground = () => (
  <View style={annoyingStyles.backgroundContainer} pointerEvents="none">
    <Text style={annoyingStyles.emojiPattern}>
      🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡{"\n"}
      🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴{"\n"}
      🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡{"\n"}
      🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴🤡🥴
    </Text>
  </View>
);

export default function About() {
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: "green", dark: "red" }}>
      <AnnoyingBackground />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          About
        </ThemedText>
        <ThemedText style={styles.text}>
          Our website strives to provide you with (horrible) recipes.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  title: {
    marginBottom: 10,
    color: "yellow",
    backgroundColor: "transparent",
    fontFamily: "Papyrus",
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Comic Sans MS",
    color: "yellow",
    backgroundColor: "transparent",
  },
});

const annoyingStyles = StyleSheet.create({
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "magenta",
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emojiPattern: {
    fontSize: 30,
    lineHeight: 40,
    textAlign: "center",
    letterSpacing: 6,
    fontWeight: "bold",
    color: "lime",
  },
});
