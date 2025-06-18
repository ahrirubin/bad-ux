import { useRouter } from "expo-router";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { auth } from "../../firebase/firebase.config";
import styles from "./LoginFormStyles";

const FlashingBackground = () => {
  const flashAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flashAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(flashAnim, {
          toValue: 2,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(flashAnim, {
          toValue: 3,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(flashAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [flashAnim]);

  const backgroundColor = flashAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["#39FF14", "#FF00FF", "#00FFFF", "#FFFF00"],
  });

  return (
    <Animated.View style={[flashingStyles.background, { backgroundColor }]} />
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const isFormValid = email.trim() !== "" && password.trim() !== "";
  const router = useRouter();

  const actuallyHandleSubmit = async () => {
    if (!isLogin && password !== confirmPassword) {
      alert("Lösenorden matchar inte");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/explore");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Kontot är skapat!", "Ditt konto har registrerats framgångsrikt.", [
          {
            text: "OK",
            onPress: () => router.push("/explore"),
          },
        ]);
      }
    } catch (error: any) {
      console.error("Firebase error:", error);
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlashingBackground />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{isLogin ? "Logga in" : "Skapa konto"}</Text>

        <Text style={styles.label}>Lösenord</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="ange ditt (läckta) lösenord"
        />

        <Text style={styles.label}>E-post</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="emailemailemailemailemailemailemail"
        />

        {!isLogin && (
          <>
            <Text style={styles.label}>Bekräfta lösenord</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="email2email2email2email2email2email2email2"
            />
          </>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.disabledButton]}
          onPress={actuallyHandleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>
            {isLogin ? "Registrera" : "Logga in"}
          </Text>
        </TouchableOpacity>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleTextWhite}>
            {isLogin ? "Har du inget konto?" : "Har du redan ett konto?"}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>
              {isLogin ? "Logga in" : "Registrera dig här"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const flashingStyles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.25,
    zIndex: -1,
  },
});

export default LoginForm;
