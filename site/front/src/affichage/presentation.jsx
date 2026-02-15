import { Link } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
function Presentation() {
    return (
        <>
            <Header />
            <div className="container bg-color-grey">
                Bonjour !
                <br />
                Bienvenu dans mon jeu !
                <Link to="/boutique" >
                    <h6>
                        Partez a la boutique !
                    </h6>
                </Link>
                <br /><br />
            </div>
            <Footer />
        </>

    )
}

export default Presentation