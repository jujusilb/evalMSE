import React, { useState, useEffect } from "react";
import Link from "react-routes/lib/Link";
import axios from 'axios'; 
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
    const [isGame, setIsGame] =useState(false);
    const token = localStorage.getItem("token");
    const [isOk, setIsOk] =useState(false);
    const [selectedCommande, setSelectedCommande] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
     const [commandes, setCommandes] = useState([]);                                               

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
                    setSelectedIndex={setSelectedIndex}
                    commandes={commandes}
                    setCommandes={setCommandes}
                    />    
                <Grimoire />
                <BtnServir 
                    isGame={isGame} 
                    setIsGame={setIsGame} 
                    selectedCommande={selectedCommande} 
                    isOk={true}
                    selectedIndex={selectedIndex}       
                    setSelectedIndex={setSelectedIndex} 
                    setCommande={setSelectedCommande}   
                    setCommandes={setCommandes}  
                />
            </div>
        </>
    )
}

export default Restaurant;