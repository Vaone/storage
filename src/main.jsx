import {createRoot} from "react-dom/client"
import { App } from "./app/App.jsx"
import "./index.less"
import { Provider } from "react-redux";
import { store } from "./reducers/index.js";
import { StrictMode } from "react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,
)
