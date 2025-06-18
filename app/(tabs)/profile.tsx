import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("password123");

  const animation = new Animated.Value(0);

  Animated.loop(
    Animated.timing(animation, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    })
  ).start();

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  const handleSave = () => {
    alert("Profil uppdaterad (inte egentligen)");
  };

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: "green", dark: "red" }}>
      <View style={styles.backgroundWrapper}>
        <Animated.View
          style={[
            styles.distractingBackground,
            {
              transform: [{ translateX }, { translateY }],
            },
          ]}
        />
      </View>

      <ThemedView style={styles.container}>
        <Text style={styles.title}>Din Profil</Text>

        <Text style={styles.label}>Namn</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Lösenord</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="ditt@email.com"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ditt fantastiska namn"
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Spara ändringar</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  distractingBackground: {
    width: width * 2,
    height: height * 2,
    backgroundColor: "lime",
    backgroundImage: `
      repeating-linear-gradient(
        45deg,
        red,
        red 10px,
        blue 10px,
        blue 20px,
        yellow 20px,
        yellow 30px,
        pink 30px,
        pink 40px
      )
    `,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    marginBottom: 10,
    color: "red",
    backgroundColor: "black",
    fontFamily: "Papyrus",
    letterSpacing: 0,
  },
  label: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Comic Sans MS",
    color: "yellow",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "black",
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
