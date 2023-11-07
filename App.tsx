import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/Navigation/Navigation";
import { GiraProvider } from "./src/Context/GiraContext";
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppState>
          <Navigation />
        </AppState>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const AppState = ({ children }: any) => {
  return (
    <GiraProvider>
      {children}
    </GiraProvider>
  )
}
export default App;