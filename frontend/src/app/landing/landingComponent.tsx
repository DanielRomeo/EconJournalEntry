import LandingNavbar from "./navbarComponent";

import Styles from '../_styles/LandingPage/LandingComponent.module.scss'

const LandingComponent = ()=>{

    return (
        <div>
            <LandingNavbar></LandingNavbar>

            {/* Landing section */}
            <div className={`${Styles.landingSection}`}>

            </div>


            {/* About secttion */}
            <div className={`${Styles.aboutSection}`}>

            </div>

            {/* Why you should join section */}

            {/* Person section */}

            {/* write, read, connect section */}

            {/* footer */}
        </div>
    )
}

export default LandingComponent;