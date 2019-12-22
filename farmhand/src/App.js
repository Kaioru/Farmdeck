import React from "react";
import Home from "./components/Home";
import SectionHeading from "./components/SectionHeading";
import "./styles.css";
import SignUpPage from "./components/SignUp";
import { navigateTo } from "./history";
import Routes from "./routes";

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
