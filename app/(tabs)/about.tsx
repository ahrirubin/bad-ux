import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function About() {
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: 'green', dark: 'red' }}>
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
    paddingVertical: 80, // extra spacing for parallax content
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 10,
    color: "red",
        backgroundColor:"black",
        fontFamily:"Papyrus",
        textAlign: "right",
        letterSpacing:-6,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Comic Sans MS',
    color: 'yellow',
  },
});
