import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase/firebase.config";
import styles from "./LoginFormStyles";

const AnnoyingBackground = () => (
  <View style={annoyingStyles.backgroundContainer}>
    <Text style={annoyingStyles.emojiPattern}>
      🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢
      {"\n"}
      🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴
      {"\n"}
      🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢
      {"\n"}
      🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴🟢🔴
    </Text>
  </View>
);

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
        Alert.alert(
          "Kontot är skapat!",
          "Ditt konto har registrerats framgångsrikt.",
          [
            {
              text: "OK",
              onPress: () => router.push("/explore"),
            },
          ]
        );
      }
    } catch (error: any) {
      console.error("Firebase error:", error);
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AnnoyingBackground />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{isLogin ? "Logga in" : "Skapa konto"}</Text>

        <Text style={styles.label}>E-post</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="emailemailemailemailemailemailemail"
        />

        <Text style={styles.label}>Lösenord</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="ange ditt (läckta) lösenord"
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
          <Text style={styles.buttonText}>{isLogin ? "Logga in" : "Registrera"}</Text>
        </TouchableOpacity>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleTextWhite}>
            {isLogin ? "Har du inget konto?" : "Har du redan ett konto?"}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>
              {isLogin ? "Registrera dig här" : "Logga in"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const annoyingStyles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'lime',
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.4,
    zIndex: -1,
  },
  emojiPattern: {
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
    letterSpacing: 4,
    fontWeight: "bold",
  }
});

export default LoginForm;
