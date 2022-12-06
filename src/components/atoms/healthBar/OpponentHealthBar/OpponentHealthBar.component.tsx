import { FC } from "react";
import { usePlayers } from "../../../../hooks/players.provider";
import "./OpponentHealthBar.scss";

const PA_OpponentHealthBar: FC = () => {
    const { currentOpponentHealth, maxOpponentHealth } = usePlayers();

    return (
        <div className="opponent-healthbar-container">
            <div className="opponent-healthbar-hp">HP</div>
            <div>
                {currentOpponentHealth}/{maxOpponentHealth}
            </div>
        </div>
    );
};

export default PA_OpponentHealthBar;
