import React from "react";
import Weather from "./components/Weather";
import "./style.css";

const App: React.FC = () => {
  return (
    <div className="app-container flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <Weather />
    </div>
  );
};

export default App;
