import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./listCommande.css";

function ListCommande() {
    const [commandes, setCommandes] = useState([]);
    const token = localStorage.getItem("token");
    
    const fetchCommande = () => {
        const url = 'http://localhost:8000/plat/genereCommande'
           axios.get(url, {})
            .then(res => {
                console.log("res.data", res.data);
                setCommandes(prev => [...prev, res.data]);
            })
            .catch(err => console.error("Erreur boutique :", err));
        console.log('commandes', commandes)
    }
    useEffect(() => {
       console.log("fetchCommande", fetchCommande())
    }, []);

    return (
        <div className="listCommande shadow-sm">
            <div className="text-center fw-bold small text-muted mb-3 border-bottom p-2">
                LISTE COMMANDES
            </div>
            <div className="d-flex flex-column gap-2 px-2">
                {commandes.map((cmd, index) => (
                    <div className="card border-info p-2 shadow-sm text-center" key={index}>
                        <strong>{cmd.label}</strong>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListCommande;