// src/App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ChatApp from "./components/ChatApp";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ChatApp />
      </div>
    </Provider>
  );
}

export default App;
