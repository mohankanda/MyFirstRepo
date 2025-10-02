import Home from "./home.jsx";

import { ThemeContext } from "./ThemeContext.js";

import IncidentList  from "./IncidentList.jsx";
import { useState } from "react";
// import styles from "./Home.module.css";

function App() {
 
  let[darkmode,setDarkmode] = useState("light");

  function handleToggleDarkMode(){

    if(darkmode === "light"){
      setDarkmode = "dark";
    }
    else{
      setDarkmode = "light";
    }

  }

  return (
    <>
    <ThemeContext.Provider value="darkmode">
    <Home toggleDarkmode = {handleToggleDarkMode} />
    </ThemeContext.Provider>
    </>
  )
}

export default App
