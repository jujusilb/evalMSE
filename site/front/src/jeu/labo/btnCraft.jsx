import react, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './labo.css'
import axios from 'axios'



function BtnCraft({ ingredients}){
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isFound, setIsFound] = useState(false);
    const [succesMessage, setSuccesMessage] = useState("");
    
    const handleClick = ()=>{
        setErrorMessage("");
        setIsError(false);
        setIsFound(false);
        setSuccesMessage("");

        console.log("props-ingredients", ingredients)
        const token = localStorage.getItem("token");
        const url = 'http://localhost:8000/decouvRecette'
        axios.post(url,
            { ingredients: ingredients },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(res => {
            console.log("res data", res.data);
            if(res.data.code=="NotFound"){
                setIsError(true);
                setErrorMessage="Plat non trouvé"
            } else if(res.data.code == "Found"){
                setIsFound(true);
                setSuccesMessage="Plat ajouté au grimoire !"
            }
            
        })
        .catch(err => {
            if (err.response && err.response.status === 409) {
                setIsError(true);
                setErrorMessage("Plat déjà connu !");
            } else {
                console.error("Erreur :", err.message);
            }
        });
    }
    
    return (
        <div className="d-flex flex-column align-items-center">
            <div 
                className="btnCraft" 
                onClick={handleClick}
                style={{ 
                    backgroundColor: isError ? "red" : (isFound?"green":"#007bff"),
                    transition: "background-color 0.3s" 
                }}
            >
                Crafter !
            </div>
            {isError && (
                <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
                    {errorMessage}
                </div>
            )}
            {isFound && (
                <div style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>
                    {succesMessage}
                </div>
            )}
        </div>
    )
}
export default BtnCraft