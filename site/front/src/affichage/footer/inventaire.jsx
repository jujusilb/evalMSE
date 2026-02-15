import React, { useState, useEffect } from "react";
import Link from "react-routes/lib/Link";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Inventaire() {
    const [ingredients, setIngredients] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const url = 'http://localhost:8000/stocks'
        axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                console.log("res.data", res.data);
                setIngredients(res.data.items);
            })
            .catch(err => console.error("Erreur boutique :", err));
        console.log('ingredients', ingredients)
    }, []);
    return (
        <>
            {ingredients.map((ingredient, ingredientId) => (
                    <div className="h-25 card" key={ingredientId}>
                        <div className="card-header">{ingredient.ingredient.label}</div>
                        <div className="card-body">{ingredient.quantite}</div>
                    </div>
                ))}
                <h3>Inventaire</h3>
        </>
    )
}
export default Inventaire