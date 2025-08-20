import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Login Screen */}
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* Signup Screen */}
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
