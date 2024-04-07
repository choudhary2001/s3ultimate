import { useState } from "react";
import "./App.css";
import Home from "./component/Home";
import Signin from "./component/Signin";
function App() {
  const [smtp, setSmtp] = useState("");

  return (
    <>
      {/* <Signin /> */}
      <Signin />
    </>
  );
}

export default App;
