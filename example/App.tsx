import * as ExpoPip from "expo-pip";
import { useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const { isInPipMode } = ExpoPip.useIsInPip();
  const [sourceRectHint, setSourceRectHint] =
    useState<ExpoPip.SourceRectHint>();

  function onWatchLayout(event: LayoutChangeEvent) {
    if (sourceRectHint) return;

    const { y, x, height, width } = event.nativeEvent.layout;
    const rect = { left: x, top: y, right: x + width, bottom: y + height };
    setSourceRectHint(rect);

    ExpoPip.setPictureInPictureParams({
      sourceRectHint: rect,
      width: 250,
      height: 250,
      seamlessResizeEnabled: false,
    });
  }

  useEffect(() => {
    ExpoPip.setPictureInPictureParams({
      autoEnterEnabled: true,
    })
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#FFF" />
      <View style={styles.watchContainer} onLayout={onWatchLayout}>
        <Text style={styles.hour}>
          Hello!
        </Text>
      </View>
      {!isInPipMode && (
        <View style={{ paddingVertical: 16 }}>
          <Text>Only show me in app</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  watchContainer: {
    borderRadius: 15,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    width: "100%"
  },
  hour: {
    color: "black",
    fontSize: 60,
    fontWeight: "bold",
  },
});
