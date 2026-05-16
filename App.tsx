import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css"
import Navigation from "./src/navigations";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
