import { useEffect } from "react";

import "./app.css";
import { useDispatch } from "react-redux";
import { auth } from '../actions/user.js';
import { Router } from "./router.jsx";

export function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(auth())
  }, [])

  return (
      <div className="App">
          <Router />
      </div>
  );
}
