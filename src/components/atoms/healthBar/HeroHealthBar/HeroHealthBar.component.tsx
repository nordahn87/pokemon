import {FC} from "react";
import "./HeroHealthBar.scss"

const PA_HeroHealthBar:FC = () => {
    return (
        <div className="hero-healthbar-container">
            <div className="hero-healthbar-hp">HP</div>
            <div>*120/120</div>
        </div>
    );
};

export default PA_HeroHealthBar;
