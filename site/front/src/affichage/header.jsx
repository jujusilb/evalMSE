import React from "react";
import Bandeau from "./bandeau";

function Header(){

    return(
        <header className="fixed-top d-flex justify-content-between align-items-center w-100 px-4 py-2 border-bottom bg-white">
            <h3 className="m-0">Mon Jeu de Cuisine</h3>
            <Bandeau />
        </header>
    )
}
export default Header;