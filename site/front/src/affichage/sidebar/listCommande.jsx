import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./listCommande.css";

function ListCommande({ setCommande, isGame, setIsOk }) {
    const [commandes, setCommandes] = useState([]);
    const token = localStorage.getItem("token");



    useEffect(() => {
        let interval;
        if (isGame) {
            fetchCommande();
            interval = setInterval(() => {
                fetchCommande();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isGame]);



    const fetchCommande = () => {
        const url = 'http://localhost:8000/plat/genereCommande'
        axios.get(url, {})
            .then(res => {
                console.log("res.data Commade", res.data);
                setCommandes(prev => [...prev, res.data]);
            })
            .catch(err => console.error("Erreur boutique :", err));
        console.log('commandes', commandes)

    }

    const handleClick = (cmd, index) => {
        console.log("IN LISTCOMMANDE.HANDLECLICK")
        setIsOk(true);
        setCommande(cmd)
        console.log("commande", cmd)
        setSelected(index)
        console.log("Index sélectionné :", index);
        const token = localStorage.getItem("token");
        const url = 'http://localhost:8000/plat/checkIF'
        axios.post(url, { plat: cmd }, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log("res data check", res.data);
                setIsOk(res.data)
            })
            .catch(err => {
                console.error("Erreur :", err.message);
            });
        console.log('commandes', commandes)
    }
    return (
        <div className="listCommande shadow-sm">
            <div className="text-center fw-bold small text-muted mb-3 border-bottom p-2">
                LISTE COMMANDES
            </div>
            <div className="d-flex flex-column gap-2 px-2">
                {commandes.map((cmd, index) => (
                    <div className="card border-info p-2 shadow-sm text-center"
                        onClick={() => handleClick(cmd, index)}
                        key={index}
                        style={{
                            backgroundColor: selected === index ? "#ffeeba" : "white", // Jaune si sélectionné
                            cursor: "pointer",
                            borderWidth: selected === index ? "2px" : "1px", // Un peu plus épais
                            transition: "all 0.2s ease"
                        }}>
                        <strong>{cmd.label}</strong>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListCommande;