import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { WebView } from "react-native-webview";
import { useRunTracker } from "../../hooks/useRunTracker";

export default function MapWebView() {
  const { path, isRunning, startRun, stopRun } = useRunTracker();
  const webviewRef = useRef<WebView>(null);

  // Send updated path to WebView whenever path changes
  useEffect(() => {
    if (path.length > 0 && webviewRef.current) {
      const coords = JSON.stringify(path); // send as array
      const jsCode = `
        if (window.updatePolygon) {
          window.updatePolygon(${coords});
        }
      `;
      webviewRef.current.injectJavaScript(jsCode);
    }
  }, [path]);

  const leafletHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <style>
          html, body, #map { height: 100%; margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([28.6139, 77.2090], 14); // Default Delhi
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          var runnerMarker = null;
          var polygon = null;

          window.updatePolygon = function(path) {
            if (path.length === 0) return;

            var latlngs = path.map(p => [p.latitude, p.longitude]);

            if (!runnerMarker) {
              runnerMarker = L.marker(latlngs[latlngs.length - 1]).addTo(map);
            } else {
              runnerMarker.setLatLng(latlngs[latlngs.length - 1]);
            }

            if (polygon) {
              map.removeLayer(polygon);
            }

            polygon = L.polygon(latlngs, { color: 'red', fillColor: 'rgba(0, 214, 196, 1)', fillOpacity: 0.2 }).addTo(map);

            map.setView(latlngs[latlngs.length - 1]);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ html: leafletHTML }}
        style={styles.webview}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <Button title="Start Run" onPress={startRun} />
        ) : (
          <Button title="Stop Run" onPress={stopRun} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
});
