import { FC } from "react";
import { usePlayers } from "../../../../providers/players/players.provider";
import "./OpponentHealthBar.scss";

const PA_OpponentHealthBar: FC = () => {
    const { opponent } = usePlayers();

    return (
        <div className="opponent-healthbar-container">
            <div className="opponent-healthbar-hp">HP</div>
            <div>
                {opponent.health.currentOpponentHealth}/{opponent.health.maxOpponentHealth}
            </div>
        </div>
    );
};

export default PA_OpponentHealthBar;
