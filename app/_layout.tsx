// imports libraries
import { Stack, SplashScreen } from "expo-router";
import './globals.css'
// imports hooks
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://cafdbbbf18176b7c964dfde52a7a4273@o4511332552474624.ingest.de.sentry.io/4511332573970512',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// creates and exports a RootLayout component
export default Sentry.wrap(function RootLayout() {

  // uses useAuthStore hook to get authentication state
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  // uses useFonts hook to load fonts
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

  // uses useEffect hook to hide a splash screen when fonts are loaded
  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  // uses useEffect hook to fetch authenticated user data when a component mounts
  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  // returns null if fonts are not loaded or loading state is true
  if(!fontsLoaded || isLoading) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
});
