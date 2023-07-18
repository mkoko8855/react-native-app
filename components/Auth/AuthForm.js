//0718
//이 클래스는 Input.js를 사용할거다.

import React, { useState } from "react";
import { View } from "react-native";
import Input from "./Input";
import Button from "../ui/Button";

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    //부모가 전달해준 값들을 길게표현했음. 이 결과값을 맨아래 input들에 전달해줘서 디자인해줄것임.
    email: emailIsInvalid,
    name: nameIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "name":
        setEnteredName(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      name: enteredName,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <View>
        <Input
          label="이메일 주소"
          onUpdateValue={updateInputValueHandler.bind(this, "email")} //값을전달해줄꺼니 bind쓰자.
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="이름"
            onUpdateValue={updateInputValueHandler.bind(this, "name")}
            value={enteredName}
            isInvalid={nameIsInvalid}
          />
        )}
        <Input
          label="비밀번호"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          value={enteredPassword}
          secure
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="비밀번호 확인"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "comfirmPassword"
            )}
            value={setEnteredConfirmPassword}
            secure
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "로그인" : "회원 가입"}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
