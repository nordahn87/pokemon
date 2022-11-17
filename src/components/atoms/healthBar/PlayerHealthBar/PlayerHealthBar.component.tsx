import {FC} from "react";
import "./PlayerHealthBar.scss"

const PA_PlayerHealthBar:FC = () => {
    return (
        <div className="player-healthbar-container">
            <div className="player-healthbar-hp">HP</div>
            <div>*120/120</div>
        </div>
    );
};

export default PA_PlayerHealthBar;
