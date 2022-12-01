import {FC} from "react";
import {useOpponent} from "../../../../hooks/players/opponent.provider";
import "./OpponentHealthBar.scss"

const PA_OpponentHealthBar:FC = () => {

    const { currentOpponentHealth, maxOpponentHealth } = useOpponent();

    return (
        <div className="opponent-healthbar-container">
            <div className="opponent-healthbar-hp">HP</div>
            <div>{currentOpponentHealth}/{maxOpponentHealth}</div>
        </div>
    );
};

export default PA_OpponentHealthBar;
