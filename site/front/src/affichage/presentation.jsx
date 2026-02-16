import { Link } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import Grimoire from './sidebar/grimoire'
function Presentation() {
    return (
        <>
            <Header />
            <Grimoire />
            <div className="container bg-color-grey">
                Bonjour !
                <br />
                Bienvenu dans mon jeu !
               
                    <h6>
                        <Link to="/boutique" >
                            Partez a la boutique !
                        </Link><br />
                        <Link to="/labo" >
                            Partez  crafter !!
                        </Link>
                    </h6>
                
                <br />
                <br />

            </div>
            <Footer />
        </>

    )
}

export default Presentation