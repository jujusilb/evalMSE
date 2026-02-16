import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Header from '../affichage/header'
import Footer from '../affichage/footer'
import BtnCraft from './labo/btnCraft'

function Labo(){
    const [tableauIngredients, setTableauIngredients] = useState([]);

    return (
        <>
            <Header />
            
            <div className="container pt-5 text-center">
                <h1 style={{ fontWeight: 'bold', marginTop: '50px' }}>
                    Bienvenue au Labo !
                </h1>
                <div className="d-flex justify-content-center">
                    <BtnCraft ingredients={tableauIngredients} />
                </div>
                
            </div>
            <Footer ingredients={tableauIngredients} setIngredients={setTableauIngredients}/>
        </>
    );
}
export default Labo;