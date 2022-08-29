import React, { useState } from "react"
import '../App.css';

function DarkMode() {
    const [status,setStatus] = useState(() => localStorage.getItem("mode") || "light")

    localStorage.setItem("mode",status)

    let mode = "modeBox " + status

    document.querySelector("#root").removeAttribute("class");
    document.querySelector("#root").classList.add(status)

    return (
        <div className={mode}>
            <i className="fa-solid fa-sun modeBtn" onClick={() => {setStatus("dark"); localStorage.setItem("mode",status)}}></i>
            <i className="fa-solid fa-moon modeBtn" onClick={() => {setStatus("light"); localStorage.setItem("mode",status)}}></i>
        </div>
    );}
export default DarkMode;
