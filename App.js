import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SignupScreen } from "./screens/SignupScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();

function AuthStack() {
  //로그인 안했을때볼화면임.
  return (
    <Stack.Navigator
      screenOptions={{
        //screenOptions에는 Stack.Screen에 대한 디자인속성 줄수있음
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticateStack() {
  const authCtx = useContext(AuthContext); //토큰값확인해야하니 AuthContext부르자.
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      const authCtx = useContext(AuthContext); return (
      <NavigationContainer>
        {!authCtx.token && <AuthStack />}
        {authCtx.token && <AuthenticatedStack />}
      </NavigationContainer>
      );
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
