import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import VideoSkeleton from "../../util/VideoSkeleton";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setVideos([{ id: "1", title: "My First Video" }]); // mock
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <VideoSkeleton />}
        />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
      )}
    </View>
  );
}
