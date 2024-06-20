import { useState, useEffect } from "react";
import "./registration.less";
import { Input } from "../UI/input/Input";
import { registration } from "../../actions/user";
import { Btn } from "../UI/button/Btn";

export const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function registrationHandler() {
    registration(email, password);
    setPassword("");
    setEmail("");
  };

  useEffect(() => {
    const onKeypress = (e) => {
      if (e.key === "Enter") {
        document.querySelector("#enterBtn").click();
      }
    };
    document.addEventListener("keypress", onKeypress);
    return () => {
      document.removeEventListener("keypress", onKeypress);
    };
  }, []);

  return (
    <div className="registration">
      <div className="registration__header">Регистрация</div>
      <Input
        type="text"
        value={email}
        setValue={setEmail}
        placeholder="Введите email..."
      />
      <Input
        type="password"
        value={password}
        setValue={setPassword}
        placeholder="Введите password..."
      />
      <Btn
        id="enterBtn"
        onClick={() => {
          registrationHandler();
        }}>
        Зарегистрироваться
      </Btn>
    </div>
  );
};
