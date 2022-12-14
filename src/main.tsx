import { CssBaseline } from "@mui/material";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app";

import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>
);
