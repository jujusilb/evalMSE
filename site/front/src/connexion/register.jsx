import react from 'react';
import { useState } from 'react';
import axios from 'axios'; // N'oublie pas l'import !
import { useNavigate } from 'react-router-dom'; 

function Register (){
    const [username, setUsername] =useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Tentative de connexion avec :", { username, email, password });
        const url ='http://localhost:8000/auth/register'
        axios.post(url, { username, email, password })
            .then(res => {
                console.log("Compte créé !", res.data);
                alert("Compte créé avec succès ! Connecte-toi maintenant.");
                navigate('/login'); // Redirection auto vers le login
            })
            .catch(err => {
                console.error("Erreur :", err.response?.data?.message || err.message);
                alert("Erreur lors de l'inscription.");
            });
        
    };

    return (
        <div className="container text-center mt-5">
            <h1>Creez-vous un compte pour jouer !</h1>
            <form method="POST" id="formRegister" className="text-center mt-5" onSubmit={handleSubmit}>
                <div className="col">   
                    <label htmlFor="inputUsername" className="col-md-4 col-form-label text-sm-end"> Votre username :</label>
                    <input type="text" name="username" id="inputUsername" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus required/>
                </div>
                <div className="col">
                    <label htmlFor="inputEmail" className="col-md-4 col-form-label text-sm-end">Votre email :</label>
                    <input type="email" name="email" id="inputEmail" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div className="col">
                    <label htmlFor="inputPassword" className="col-md-4 col-form-label text-sm-end">Votre mot de passe :</label>
                    <input type="password" name="password" id="inputPassword" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>            
                <input type="submit" id="btnSubmit" className="btn btn-primary" value="S'ENREGISTRER" data-type="register" />
            </form>
        </div>
    )
}

export default Register