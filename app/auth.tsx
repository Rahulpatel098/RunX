import { useAuth } from "../context/authContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import SignUpAnimation from "../components/SignUpAnimation";
import LoginAnimation from "../components/LoginAnimation";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading ,setLoading] =useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  const { signIn, signUp } = useAuth();

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
    if (isSignUp) {
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
    } else {
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      router.replace("/");
    }
    setLoading(false);
  };

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // keeps spacing consistent
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.animationWrapper}>
            {isSignUp ? (
              <SignUpAnimation size={250} />
            ) : (
              <LoginAnimation size={220} />
            )}
          </View>

          <Text style={styles.title} variant="headlineMedium">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </Text>

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
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye-off" : "eye"}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />

          {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
            {loading? 
            
            (
              <ActivityIndicator size={50} color={'rgba(0, 19, 186, 0.13)'}/>
            )
            : 
            

          (<Button
            mode="contained"
            style={styles.button}
            contentStyle={{ paddingVertical: 6 }}
            onPress={handleAuth}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>)
            
            }

          <Button
            mode="text"
            onPress={handleSwitchMode}
            style={styles.switchModeButton}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  animationWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  button: {
    marginTop: 8,
    borderRadius: 12,
    elevation: 3,
  },
  switchModeButton: {
    marginTop: 16,
  },
});



// import { View, KeyboardAvoidingView, Platform, StyleSheet, } from 'react-native'
// import { Button, Text, TextInput } from 'react-native-paper'
// import React, { useState } from 'react'
// import { account } from '@/lib/appwrite';
// import { useAuth } from '@/lib/auth-context';
// import { useRouter } from 'expo-router';

// const Details = () => {
//     const [isSignUp, setIsSignUP] = useState<boolean>(false);
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [error, setError] = useState<string | null>("");
//     const { signIn, signUp } = useAuth();
//     const router = useRouter();

//     const handel = () => {
//         setIsSignUP((prev) => !prev)
//     };


//     const handelAuth = async () => {
//         if (!email || !password) {
//             setError("Please fill all the fields");
//             return;
//         }
//         if (password.length < 6) {
//             setError("password must be atleast 6 character long ")
//         }

//         setError(null);

//     if (isSignUp) {
//       const error = await signUp(email, password);
//       if (error) {
//         setError(error);
//         return;
//       }
//     } else {
//       const error = await signIn(email, password);
//       if (error) {
//         setError(error);
//         return;
//       }

//       router.replace("/(Tabs)/login");
//     }
  

//     };
//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             style={styles.container}
//         >
//             <View style={styles.content}>
//                 <Text
//                     style={styles.title}
//                 >
//                     {isSignUp ? "Create Account " : "WelCome Back "}
//                 </Text>
//                 <TextInput label="Email"
//                     autoCapitalize='none'
//                     keyboardType='email-address'
//                     placeholder='write your email'
//                     mode='outlined'
//                     onChangeText={setEmail}
//                 />
//                 <TextInput label="password"
//                     autoCapitalize='none'
//                     secureTextEntry
//                     placeholder='yourPassword'
//                     mode='outlined'
//                     onChangeText={setPassword}

//                 />
//                 {error && <Text> {error}</Text>}
//                 <Button
//                     mode='contained'
//                     style={styles.btn}
//                     onPress={handelAuth}
//                 >{isSignUp ? "SignUp" : "Welcome Back "}
//                 </Button>
//                 <Button
//                     mode='text'
//                     onPress={handel}
//                 >
//                     {isSignUp ?
//                      " Alerady have an account?  Signup " : "dont have an account create one "}
//                 </Button>
//             </View>
//         </KeyboardAvoidingView>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#F5F5F5"
//     },
//     content: {
//         flex: 1,
//         padding: 16,
//         justifyContent: 'center'

//     },
//     title: {
//         textAlign: 'center',
//         marginBottom: 20,
//         fontSize: 30
//     },
//     btn: {
//         marginTop: 30
//     }

// });

// export default Details;