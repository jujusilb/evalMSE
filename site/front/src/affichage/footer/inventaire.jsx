import React, { useState, useEffect } from "react";
import Link from "react-routes/lib/Link";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './footer.css'
function Inventaire(payload) {
    
    const {selected =[], setSelected} =payload || {}
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

    const handleSelect = (id, label) => {
        console.log("ID sélectionné :", id);
        console.log("Nom sélectionné :", label);
        if(selected.includes(id)){
            setSelected(selected.filter(item => item !== id))
        } else {
            setSelected([...selected, id]);
        }
    };
    return (
        <div className="fixed-bottom w-100 p-2" style={{ left: 0, zIndex: 1000 }}>
            <div className="text-center fw-bold small text-muted mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Inventaire</div>
            <div className="d-flex justify-content-center align-items-center" style={{ gap: '10px' }}>
                {ingredients.map((ingredient, index) => (
                    ingredient.quantite > 0 && (    
                        <div
                            className="shadow-sm"
                            key={ingredient.id || index}
                        >
                            <div onClick={
                                () => handleSelect(
                                    ingredient.ingredientId, ingredient.ingredient.label
                                )
                            }
                                style={{ backgroundColor: selected.includes(ingredient.ingredientId) ? "#FF0000" : "#DDDDDD"}}
                                className="cardIngredient justify-content-between align-items-center p-2"
                            >
                                <div >
                                    {ingredient.quantite}
                                    <br />
                                    {ingredient.ingredient.label}
                                </div >
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}
export default Inventaire