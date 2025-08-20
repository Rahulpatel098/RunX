import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput, useTheme } from "react-native-paper";
import SignUpAnimation from "../../components/SignUpAnimation";

export default function SignUpScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  const { signUp } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Passwords must be at least 8 characters long.");
      return;
    }

    setError(null);
    setLoading(true);
    const error = await signUp(email, password);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.animationWrapper}>
            <SignUpAnimation size={250} />
          </View>
          <Text style={styles.title} variant="headlineMedium">Create Account</Text>
          <TextInput
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="example@gmail.com"
            mode="outlined"
            style={styles.input}
            onChangeText={setEmail}
            left={<TextInput.Icon icon="email" />}
          />
          <TextInput
            label="Password"
            autoCapitalize="none"
            mode="outlined"
            secureTextEntry={!passwordVisible}
            style={styles.input}
            onChangeText={setPassword}
            left={<TextInput.Icon icon="lock" />}
            right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
          />
          {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
          {loading ? (
            <ActivityIndicator size={50} color={'rgba(0, 19, 186, 0.13)'} />
          ) : (
            <Button mode="contained" style={styles.button} contentStyle={{ paddingVertical: 6 }} onPress={handleAuth}>
              Sign Up
            </Button>
          )}
          <Button mode="text" onPress={() => router.push('/auth/login')} style={styles.switchModeButton}>
            Already have an account? Sign In
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffffff" },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 20, justifyContent: "center" },
  animationWrapper: { alignItems: "center", marginBottom: 20 },
  title: { textAlign: "center", marginBottom: 24, fontWeight: "bold" },
  input: { marginBottom: 16, backgroundColor: "white", borderRadius: 12 },
  button: { marginTop: 8, borderRadius: 12, elevation: 3 },
  switchModeButton: { marginTop: 16 },
});