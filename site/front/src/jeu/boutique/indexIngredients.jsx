import React, { useState, useEffect } from "react";
import Link from "react-routes/lib/Link";
import axios from 'axios'; // N'oublie pas l'import !
import { useNavigate } from 'react-router-dom';

function IndexIngredients() {
    console.log("IN IndexIngredients !");
    const [achat, setAchat] = useState([])
    const [ingredients, setIngredients] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const url = 'http://localhost:8000/ingredients'
        axios.get(url, {})
        .then(res => {
            console.log("res.data", res.data);
            setIngredients(res.data.items);
        })
        .catch(err => console.error("Erreur boutique :", err));
            console.log('ingredients', ingredients)
    }, []);

    const handleAchat = (ingredient) => {
        console.log("Tentative d'achat avec :", { achat });
        const token = localStorage.getItem("token");
        const url = 'http://localhost:8000/acheterIngredient'
        axios.post(url,
            { ingredientId: ingredient.id },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(res => {
            console.log("res data", res.data);
            localStorage.setItem("argent", res.data.argent)
            console.log("ingredient acheté !", res.data);
            navigate(0);
        })
        .catch(err => {
            console.error("Erreur :", err.response?.data?.message || err.message);
            alert("Erreur lors de l'achat.");
        });
    }
    console.log("ingredient avant return", ingredients);
    return (
        <div className="container" style={{ marginTop: '120px' }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Prix</th>
                        <th>Acheter</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient, index) => (
                        <tr key={index}>
                            <td>{ingredient.label}</td>
                            <td>{ingredient.prix}</td>
                            <td>
                                <button onClick={(e) => handleAchat(ingredient)} className="btn btn-info"    >Achete ce produit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )   
}

export default IndexIngredients