import {FC} from "react";
import "./OpponentHealthBar.scss"

const PA_OpponentHealthBar:FC = () => {
    return (
        <div className="opponent-healthbar-container">
            <div className="opponent-healthbar-hp">HP</div>
            <div>*130/130</div>
        </div>
    );
};

export default PA_OpponentHealthBar;
