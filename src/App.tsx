import React from "react";
import Weather from "./components/Weather";
import "./style.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>お天気アプリ</h1>
      <Weather />
    </div>
  );
};

export default App;
