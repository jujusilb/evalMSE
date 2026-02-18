import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./listCommande.css";

function ListCommande({ setCommande, isGame, setIsOk, selectedCommande, setSelectedIndex, commandes, setCommandes }) {
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
                setCommandes(prev => [...prev, res.data]);
            })
            .catch(err => console.error("Erreur boutique :", err));


    }

    const handleClick = (cmd, index) => {
        setIsOk(true);
        setCommande(cmd)
        setSelectedIndex(index);
        const token = localStorage.getItem("token");
        const url = 'http://localhost:8000/plat/checkIF'
        axios.post(url, { plat: cmd }, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setIsOk(res.data)
            })
            .catch(err => {
                console.error("Erreur :", err.message);
            });
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
                            backgroundColor: selectedCommande === cmd ? "#ffeeba" : "white",
                            borderWidth: selectedCommande === cmd ? "2px" : "1px",
                            cursor: "pointer"
                        }}>
                        <strong>{cmd.label}</strong>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListCommande;