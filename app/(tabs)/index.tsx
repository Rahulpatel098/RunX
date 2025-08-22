import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";

const mockStats = {
  distanceToday: 5.2, // km
  calories: 320,
  streak: 4, // days
  totalTerritories: 3,
};

const mockNotifications = [
  { id: "1", text: "⚔️ RunKing captured part of your territory!" },
  { id: "2", text: "🔥 You set a new personal record yesterday!" },
  { id: "3", text: "👑 You’re #2 in your city leaderboard!" },
];

export default function HomeScreen({ navigation }: any) {
  const [stats, setStats] = useState(mockStats);
  const [notifications, setNotifications] = useState(mockNotifications);

  // simulate dynamic data fetch
  useEffect(() => {
    // fetch user stats + notifications from Appwrite later
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: "https://i.pravatar.cc/100?img=5" }} style={styles.avatar} />
        <Text style={styles.greeting}>Welcome back, <Text style={{ fontWeight: "bold" }}>Runner</Text> 👋</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.distanceToday} km</Text>
          <Text style={styles.statLabel}>Today’s Run</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.calories}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.streak} 🔥</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalTerritories}</Text>
          <Text style={styles.statLabel}>Territories</Text>
        </View>
      </View>

      {/* Start Run Button */}
      <TouchableOpacity
        style={styles.runButton}
        onPress={() => navigation.navigate("Map")}
      >
        <Text style={styles.runButtonText}>▶️ Start Run</Text>
      </TouchableOpacity>

      {/* Notifications */}
      <Text style={styles.sectionTitle}>Latest Updates</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  greeting: { fontSize: 18, color: "#333" },

  // Stats
  statsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#007bff" },
  statLabel: { fontSize: 12, color: "#666", marginTop: 4 },

  // Run Button
  runButton: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  runButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  // Notifications
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10, marginTop: 5 },
  notificationCard: {
    backgroundColor: "#f1f3f6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationText: { fontSize: 14, color: "#333" },
});
