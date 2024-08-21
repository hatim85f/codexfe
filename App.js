import { useState, useEffect } from "react";
import AppNavigator from "./navigation/AppNavigator";
import * as Font from "expo-font";
import { Provider, useSelector } from "react-redux";
import mainStore from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./constants/firebaseConfig";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform } from "react-native";
import ErrorModal from "./components/error/ErrorModal";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Initialize Firebase
  initializeApp(firebaseConfig);

  useEffect(() => {
    const fetchFonts = async () => {
      await Font.loadAsync({
        main: require("./assets/fonts/montserrat.ttf"),
      });
      setAppIsReady(true); // Set appIsReady to true after the font has loaded
    };

    fetchFonts();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={mainStore}>
          <AppNavigator />
          {Platform.OS === "web" && <ErrorModal />}
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
