import React, {useEffect} from "react";

import "./app.css";
import { useSelector, useDispatch } from "react-redux";
import {auth} from '../actions/user.js';
import {Router} from "./router.jsx";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
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

export default App;