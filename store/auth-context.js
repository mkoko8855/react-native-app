import AsyncStorage from "@react-native-async-storage/async-storage";
import { Children, createContext } from "react";

export const AuthContext = createContext({
  token: "",
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ Children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContextProvider value={value}>{Children}</AuthContextProvider>;
}

export default AuthContextProvider;
