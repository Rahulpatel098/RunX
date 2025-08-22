// ProfileScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

// --- Mock data for now ---
const mockUser = {
  username: "RunXKing",
  fullName: "John Doe",
  profilePic: "https://i.pravatar.cc/150?img=3", // random avatar
  city: "Delhi",
  stats: {
    distance: 120, // km
    time: 800, // minutes
    calories: 9500,
    territories: 5,
  },
  runs: [
    { id: "1", date: "2025-08-01", distance: 5.2, territory: "Connaught Place" },
    { id: "2", date: "2025-08-03", distance: 7.8, territory: "Lodhi Gardens" },
    { id: "3", date: "2025-08-05", distance: 10.1, territory: "India Gate" },
  ],
};

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);

  // Simulate fetching user data (later replace with Appwrite fetch)
  useEffect(() => {
    setUser(mockUser);
  }, []);

  if (!user) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.profilePic }} style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.city}>📍 {user.city}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.stats.distance} km</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.stats.time} min</Text>
          <Text style={styles.statLabel}>Time</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.stats.calories}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.stats.territories}</Text>
          <Text style={styles.statLabel}>Territories</Text>
        </View>
      </View>

      {/* Run History */}
      <Text style={styles.sectionTitle}>Past Runs</Text>
      <FlatList
        data={user.runs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.runItem}>
            <Text style={styles.runDate}>{item.date}</Text>
            <Text style={styles.runDetails}>
              {item.distance} km 🏃 • {item.territory}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  loading: { textAlign: "center", marginTop: 50, fontSize: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 20, fontWeight: "bold" },
  username: { fontSize: 14, color: "gray" },
  city: { fontSize: 14, color: "#444" },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: { alignItems: "center", flex: 1 },
  statValue: { fontSize: 18, fontWeight: "bold" },
  statLabel: { fontSize: 12, color: "gray" },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  runItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  runDate: { fontSize: 14, color: "gray" },
  runDetails: { fontSize: 16, fontWeight: "500" },
});
