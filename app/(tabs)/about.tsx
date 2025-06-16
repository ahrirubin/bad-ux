import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Text } from "react-native";

export default function About() {
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: 'green', dark: 'red' }}>
      <ThemedView style={styles.container}>
        <Text style={styles.text}>
          Our website strives to provide you with (horrible) recipes.
        </Text>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80, // extra spacing for parallax content
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
