import React, { useState, useEffect } from "react";
import Link from "react-routes/lib/Link";
import axios from 'axios'; // N'oublie pas l'import !
import { useNavigate } from 'react-router-dom'; 
import Header from "../affichage/header";
import  IndexIngredients from "./boutique/IndexIngredients";
import Inventaire from "../affichage/footer";
import { useParams } from "react-router-dom";

function MarketPlace(){

    return (
        <>
            <Header />
            <h1>Bienvenu dans la boutique !</h1>
            <IndexIngredients />
            <Inventaire />
        </>
    )
}

export default MarketPlace