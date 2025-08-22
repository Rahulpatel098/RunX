// LeaderboardScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// --- Mock Leaderboard Data ---
const mockLeaderboard = [
  { id: "1", username: "RunKing", distance: 120, territories: 8, avatar: "https://i.pravatar.cc/100?img=1" },
  { id: "2", username: "SpeedySam", distance: 95, territories: 5, avatar: "https://i.pravatar.cc/100?img=2" },
  { id: "3", username: "TrailQueen", distance: 88, territories: 6, avatar: "https://i.pravatar.cc/100?img=3" },
  { id: "4", username: "JoggerJoe", distance: 70, territories: 3, avatar: "https://i.pravatar.cc/100?img=4" },
];

// --- Mock Community Chat ---
const mockMessages = [
  { id: "1", user: "RunKing", text: "Just conquered Connaught Place! 👑", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: "2", user: "TrailQueen", text: "🔥 Nice! I’m coming for Lodhi Gardens!", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: "3", user: "SpeedySam", text: "Anyone up for a morning run tomorrow?", avatar: "https://i.pravatar.cc/100?img=2" },
];

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "community">("leaderboard");
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  // --- Simulate leaderboard fetch ---
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  useEffect(() => {
    setLeaderboard(mockLeaderboard);
  }, []);

  // --- Send message handler ---
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now().toString(),
      user: "You",
      text: newMessage,
      avatar: "https://i.pravatar.cc/100?img=5", // your profile pic later
    };
    setMessages((prev) => [msg, ...prev]);
    setNewMessage("");
  };

  return (
     <KeyboardAvoidingView style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
    <View style={styles.container}>
      {/* Tabs Switcher */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setActiveTab("leaderboard")} style={[styles.tab, activeTab === "leaderboard" && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === "leaderboard" && styles.activeTabText]}>🏆 Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("community")} style={[styles.tab, activeTab === "community" && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === "community" && styles.activeTabText]}>💬 Community</Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard View */}
      {activeTab === "leaderboard" && (
        <FlatList
          data={leaderboard}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.leaderItem}>
              <Text style={styles.rank}>{index + 1}</Text>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.subtext}>
                  {item.distance} km • {item.territories} territories
                </Text>
              </View>
              <Text style={styles.crown}>{index === 0 ? "👑" : ""}</Text>
            </View>
          )}
        />
      )}

      {/* Community View */}
      {activeTab === "community" && (
       
        <View >
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.messageItem}>
                <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
                <View style={styles.messageBubble}>
                  <Text style={styles.messageUser}>{item.user}</Text>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              </View>
            )}
            inverted // newest at bottom
          />

          {/* Input Box */}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Tabs
  tabBar: { flexDirection: "row", backgroundColor: "#f5f5f5" },
  tab: { flex: 1, padding: 14, alignItems: "center" },
  activeTab: { borderBottomWidth: 3, borderBottomColor: "#007bff" },
  tabText: { fontSize: 16, color: "#666" },
  activeTabText: { color: "#007bff", fontWeight: "bold" },

  // Leaderboard
  leaderItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rank: { fontSize: 18, fontWeight: "bold", width: 30 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontSize: 16, fontWeight: "600" },
  subtext: { fontSize: 13, color: "gray" },
  crown: { fontSize: 18 },

  // Community
  messageItem: { flexDirection: "row", padding: 10, alignItems: "flex-start" },
  chatAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  messageBubble: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 10, flex: 1 },
  messageUser: { fontWeight: "bold", marginBottom: 2 },
  messageText: { fontSize: 14 },

  // Input
  inputBox: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fafafa",
  },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 20, paddingHorizontal: 12 },
  sendButton: { marginLeft: 10, backgroundColor: "#007bff", borderRadius: 20, padding: 10 },
  sendText: { color: "#fff", fontSize: 16 },
});
