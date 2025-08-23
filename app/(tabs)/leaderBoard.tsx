import { DATABASE_ID, databases, MESAGESDATA_ID, client } from "@/appwrite"; 
import { useAuth } from "@/context/authContext";
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
import { ID, Query } from "react-native-appwrite";

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "community">("leaderboard");
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();

  // --- Fetch old messages ---
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, MESAGESDATA_ID, [
          Query.orderDesc("createdAt"),
          Query.limit(50),
        ]);

        const formatted = res.documents.map((doc: any) => ({
          id: doc.$id,
          user: doc.username,
          text: doc.message,
          avatar: doc.avatar || "https://i.pravatar.cc/100",
          createdAt: doc.createdAt,
        }));

        setMessages(formatted);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, []);

  // --- Realtime subscription ---
  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${MESAGESDATA_ID}.documents`,
      (response) => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          const doc: any = response.payload;
          const newMsg = {
            id: doc.$id,
            user: doc.username,
            text: doc.message,
            avatar: doc.avatar || "https://i.pravatar.cc/100",
            createdAt: doc.createdAt,
          };

          setMessages((prev) => [newMsg, ...prev]); // push new message on top
        }
      }
    );

    return () => {
      unsubscribe(); // clean up on unmount
    };
  }, []);

  // --- Send a message ---
  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      await databases.createDocument(
        DATABASE_ID,
        MESAGESDATA_ID,
        ID.unique(),
        {
          userId: user.$id,
          username: user.name || "Anonymous",
          message: newMessage,
          // avatar: user.profilePic || `https://i.pravatar.cc/100?u=${user.$id}`,
          createdAt: new Date().toISOString(),
        }
      );

      setNewMessage(""); // clear input
      // No need to manually update `messages` here → realtime will handle it
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setActiveTab("leaderboard")}
          style={[styles.tab, activeTab === "leaderboard" && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === "leaderboard" && styles.activeTabText]}>
            🏆 Leaderboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("community")}
          style={[styles.tab, activeTab === "community" && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === "community" && styles.activeTabText]}>
            💬 Community
          </Text>
        </TouchableOpacity>
      </View>

      {/* Community Chat */}
      {activeTab === "community" && (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
  >
    <View style={{ flex: 1 }}>
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
        inverted
      />

      {/* Input */}
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
  </KeyboardAvoidingView>
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  tabBar: { flexDirection: "row", backgroundColor: "#f5f5f5" },
  tab: { flex: 1, padding: 14, alignItems: "center" },
  activeTab: { borderBottomWidth: 3, borderBottomColor: "#007bff" },
  tabText: { fontSize: 16, color: "#666" },
  activeTabText: { color: "#007bff", fontWeight: "bold" },
  messageItem: { flexDirection: "row", padding: 10, alignItems: "flex-start" },
  chatAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  messageBubble: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 10, flex: 1 },
  messageUser: { fontWeight: "bold", marginBottom: 2 },
  messageText: { fontSize: 14 },
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
