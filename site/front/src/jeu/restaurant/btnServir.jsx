import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './restaurant.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function BtnServir({ isGame, setIsGame, selectedCommande, isOk, setCommande, setCommandes, selectedIndex, setSelectedIndex }) {
    const handleClick = () => {

        if (isGame) {
            if (isOk) {
                const token = localStorage.getItem("token");
                const url = 'http://localhost:8000/plat/servirPlat'
                console.log("ON SE PREPARE A SERVIR")
                axios.post(url, { plat: selectedCommande }, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        console.log("SERVI !!!!")
                        console.log("res data servi", res.data)
                        localStorage.setItem("argent", res.data.argent);
                        localStorage.setItem("points", res.data.points);
                        setCommandes(prev => {
                            const nouveauTableau = [...prev];

                            if (selectedIndex !== null && selectedIndex >= 0) {
                                nouveauTableau.splice(selectedIndex, 1);
                            }
                            return nouveauTableau;
                        });

                        setCommande(null);
                        setSelectedIndex(null);
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