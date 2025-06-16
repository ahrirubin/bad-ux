import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase/firebase.config";
import styles from "./LoginFormStyles";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [loginClickCount, setLoginClickCount] = useState(0);
    const isFormValid = email.trim() !== "" && password.trim() !== "";
    const router = useRouter();

    const showLoginAlert = () => {
        let message = "press okay to log in.";
        if (loginClickCount > 0) {
            message = "press okay again" + ".".repeat(loginClickCount);
        }

        Alert.alert(
            "Login Confirmation",
            message,
            [
                {
                    text: "OK",
                    onPress: () => {
                        const newCount = loginClickCount + 1;
                        setLoginClickCount(newCount);
                        if (newCount >= 5) {
                            actuallyHandleSubmit();
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

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
                router.push("/explore");
            }
        } catch (error: any) {
            console.error("Firebase error:", error);
            setError("Fel användarnamn eller lösenord");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? "Skapa konto" : "Logga in"}</Text>

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
                    />
                </>
            )}

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
                style={[styles.button, !isFormValid && styles.disabledButton]}
                onPress={showLoginAlert}
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
                        {isLogin ? "Logga in här" : "Registrera dig här"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginForm;
