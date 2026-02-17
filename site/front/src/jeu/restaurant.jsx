import React, { useState, useEffect } from "react";
import Link from "react-routes/lib/Link";
import axios from 'axios'; // N'oublie pas l'import !
import { useNavigate } from 'react-router-dom'; 
import Header from "../affichage/header";
import  IndexIngredients from "./boutique/IndexIngredients";
import Inventaire from "../affichage/footer";
import { useParams } from "react-router-dom";
import Grimoire from "../affichage/sidebar/grimoire";
import ListCommande from "../affichage/sidebar/listCommande";
import BtnServir from "./restaurant/btnServir";
import "./restaurant/restaurant.css"

function Restaurant(){
    const [currentCommandes, SetcurrentCommandes] =useState([])
    const [isGame, setIsGame] =useState(false);
    const token = localStorage.getItem("token");
    const [isOk, setIsOk] =useState(false);
    const [selectedCommande, setSelectedCommande] = useState(null);
                                                    
    //if(isGame){
    //    setTimeout(fetchCommande, 3000);
    //}
    return (
        <>
            <Header />
            <div className="container">
                <h1>Salle de restaurant</h1>
                <ListCommande
                    isGame={isGame}
                    setIsOk={setIsOk} 
                    setCommande={setSelectedCommande}
                    selectedCommande={selectedCommande}
                    />    
                <Grimoire />
                <BtnServir 
                    isGame={isGame} 
                    setIsGame={setIsGame} 
                    selectedCommande={selectedCommande} 
                    isOk={true}
/>
            </div>
        </>
    )
}

export default Restaurant;