import { useEffect, useState } from "react";
import "./authorization.css";
import { Input } from "../UI/input/Input";
import { login } from "../../actions/user";
import { useDispatch } from "react-redux";
import { Btn } from "../UI/button/Btn";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function enter() {
    dispatch(login(email, password));
    setPassword("");
    setEmail("");
  }

  useEffect(() => {
    const onKeypress = e => {
      if (e.key === 'Enter') {
        document.querySelector('#enterBtn').click();
      }
    };
    document.addEventListener('keypress', onKeypress);
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, []);

  return (
    <div className="registration">
      <div className="registration__header">Авторизация</div>
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
      <Btn onClick={() => enter()} id="enterBtn">
        Войти
      </Btn>
    </div>
  );
};
