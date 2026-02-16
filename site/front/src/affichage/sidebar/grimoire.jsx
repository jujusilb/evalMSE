import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Grimoire(){
    
    const [plats, setPlats]  =useState([])
    const token = localStorage.getItem("token");
    useEffect(() => {
        const url = 'http://localhost:8000/grimoires'
        axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                console.log("res.data", res.data);
                setPlats(res.data.items);
            })
            .catch(err => console.error("Erreur Grimoire :", err));
        console.log('plats', plats)
    }, []);
    return (
        <div className="container">
            <div className="text-center fw-bold small text-muted mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Grimoire</div>
            <div className="d-flex justify-content-center align-items-center" style={{ gap: '10px' }}>
                {plats.map((plat, index) => (
                    <div className="shadow-sm" key={plat.id || index}>
                        <div className="align-items-center p-2">
                            <div>
                                {plat.plat?.label || "Recette inconnue"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Grimoire;