import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Bandeau(){
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const argent = localStorage.getItem("argent") || 0;
    const points = localStorage.getItem("points") || 0;
    const handleLogout = () => {
        localStorage.clear(); // On vide tout (token, username, etc.)
        window.location.reload(); // On rafraîchit pour que le code repasse dans le "else"
    };
    const message="Bonjour"
    let action
    let stats =""
    if(token){
        action = username;
        stats=(
            <>
                <div id="argent" className="p-2">
                    Argent<br />{argent}
                </div>
                <div id="point" className="p-2">
                    Points<br />{points}
                </div>
                <div id="logoff">
                    <button onClick={handleLogout}>Log Off</button>
                </div>
            </>
        )
            
    } else {
        action =<Link to='/login'>Se Connecter</Link>;
    }
    
    return (
            <div id="logging" style={{ width: '250px', height: '100px' }}
            className="align-items-center border d-flex justify-content-around">
                <div id="bonjour" className="p-2">
                    {message}<br />{action}
                </div>
                {stats}
            </div>
    )
}
export default Bandeau