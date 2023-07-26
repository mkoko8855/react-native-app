//0718

import { Alert, StyleSheet, View } from "react-native";
import AuthForm from "./AuthForm";
import { useState } from "react";
import FlatButton from "../ui/FlatButton";
import { useNavigation } from "@react-navigation/native";

const AuthContent = (isLogin, onAuthenticate) => {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({ 
    email: false,
    name: false,
    password: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    //유효성검증하는 부분 -> 자식컴포넌트가 사용자가 입력한 값을 객체형태로 보낼테니 얘가 받아서 유효성검증.
    let { email, name, password, confirmPassword } = credentials; //객체디스트럭쳐(분해) -> 하나씩검증해봐야하니까.
    console.log("submitHandler email: ", email);

    email = email.trim(); //공백이있을까봐 양쪽공백제거
    password = password.trim(); //이것도.
    const nameRegex = /^[가-힣]{2,4}$/; //한글만허용한다.

    const emailIsValid = email.includes("@");
    const nameIsValid = nameRegex.test(name);
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!nameIsValid || !passwordsAreEqual))
    ) {
      Alert.alert(
        "유효하지 않은 입력값이 있습니다. 확인 후 다시 입력해 주세요."
      );
      setCredentialsInvalid({
        //다시검증할수있게끔. 즉, 위가 하나라도 잘못되면 나머지가 트루라도 값을 다시 확인하겠다~
        email: !emailIsValid,
        name: !nameIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    //여기에는 fetch요청코드가 시작되는 부분.
    onAuthenticate({
      email,
      password,
      name,
    });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        //사용자가 작성한 것들을 검증하는 부분 -> 백엔드로 보내도 될지말지 판단할거임
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "회원 가입하기" : "로그인 화면으로 이동하기"}
        </FlatButton>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
