import React from "react";
import Inventaire from "./footer/inventaire";

function Footer(payload){
    const {ingredients, setIngredients}= payload || {};
    return(
        <footer className="fixed-bottom w-100 justify-content-end d-flex text-align-center" style={{ marginTop: '120px' }}>
            <Inventaire selected={ingredients} setSelected={setIngredients}/>
        </footer>        
    )
}
export default Footer;