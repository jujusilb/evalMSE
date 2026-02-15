import { Link } from 'react-router-dom'
import Header from './header'
import Inventaire from './inventaire'
function Presentation() {
    return (
        <>
            <Header />
            <div className="cibtainer bg-color-grey">
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
            <Inventaire />
        </>

    )
}

export default Presentation