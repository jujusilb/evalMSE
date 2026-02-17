import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './restaurant.css'
import axios from 'axios'



function BtnServir({ isGame, setIsGame, selectedCommande, isOk }) {
    console.log('IN -BTNSERVIR.HANDLECLICK')
    console.log("props commande, isGame", selectedCommande, isGame)
    const handleClick = () => {
        if (isGame) {
            if (isOk) {
                console.log("ON SE PREPARE A SERVIR")
                const token = localStorage.getItem("token");
                const url = 'http://localhost:8000/plat/servirPlat'
                console.log("ON SE PREPARE A SERVIR")
                axios.post(url, { plat: selectedCommande }, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        console.log("res data plat servie !", res.data);
                    })
                    .catch(err => {
                        console.error("Erreur :", err.message);
                    }
                    );
            } else {
                console.log("IS NOT OK !!")
            }
        } else {
            setIsGame(true);
        }
    }

    return (


        <div className="flex-column align-items-center">
            <div
                className="btnServir" onClick={handleClick}>
                SERVIR !
            </div>

        </div>
    )
}
export default BtnServir