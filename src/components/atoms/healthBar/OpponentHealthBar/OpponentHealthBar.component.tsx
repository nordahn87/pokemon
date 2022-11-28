import {FC} from "react";
import {PA_OpponentHealthBarProps} from "./OpponentHealthBar.props";
import "./OpponentHealthBar.scss"

const PA_OpponentHealthBar:FC<PA_OpponentHealthBarProps> = ({currentOppponentHealth}) => {
    return (
        <div className="opponent-healthbar-container">
            <div className="opponent-healthbar-hp">HP</div>
            <div>{currentOppponentHealth}/*130</div>
        </div>
    );
};

export default PA_OpponentHealthBar;
