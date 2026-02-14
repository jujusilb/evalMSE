import react from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'; // N'oublie pas l'import !
import { useNavigate } from 'react-router-dom'; 

function Login (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Tentative de connexion avec :", { email, password });
        const url ='http://localhost:8000/auth/login'
        axios.post(url, { email, password })
            .then(res => {
                const { token } = res.data;
                const { username} =res.data.user;
                const { argent } = res.data.user;
                const { points } = res.data.user;
                console.log("res data", res.data.user);
                localStorage.setItem('token', token);
                localStorage.setItem("username", username)
                localStorage.setItem("argent", argent)
                localStorage.setItem("points", points)
                
                console.log("Compte créé !", res.data);
                alert("Compte Tu es connecté ! Bon jeu !");
                navigate('/');
            })
            .catch(err => {
                console.error("Erreur :", err.response?.data?.message || err.message);
                alert("Erreur lors de l'inscription.");
            });
        
    };
    return (
        <div className="container text-center mt-5">
            <h1>Connectez-vous pour jouer !</h1>
            <form method="POST" id="formRegister" className="text-center mt-5" onSubmit={handleSubmit}>
                <div className="col">
                    <label htmlFor="inputEmail" className="col-md-4 col-form-label text-sm-end">Votre email :</label>
                    <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="inputEmail" autoFocus required/>
                </div>
                <div className="col">
                    <label htmlFor="inputPassword" className="col-md-4 col-form-label text-sm-end">Votre mot de passe :</label>
                    <input type="password" name="password" id="inputPassword" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <input type="submit" id="btnSubmit" className="btn btn-info" value="S'ENREGISTRER" data-type="login" />
            </form>
            <Link to="/register" >
                <h6>
                    Ou bien, creez-vous un compte
                </h6>
            </Link>
        </div>
    )
}
export default Login