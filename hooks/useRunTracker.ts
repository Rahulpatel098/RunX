import * as Location from "expo-location";
import { useState, useRef } from "react";

export function useRunTracker() {
  const [path, setPath] = useState<{ latitude: number; longitude: number }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  const startRun = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    setPath([]);
    setIsRunning(true);

    watchRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 5, // update every 5m
      },
      (loc) => {
        const coords = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        setPath((prev) => [...prev, coords]);
      }
    );
  };

  const stopRun = () => {
    watchRef.current?.remove();
    watchRef.current = null;
    setIsRunning(false);
  };

  return { path, isRunning, startRun, stopRun };
}
