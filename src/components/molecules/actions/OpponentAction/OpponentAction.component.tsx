import { FC } from "react";
import PA_OpponentHealthBar from "../../../atoms/healthBar/OpponentHealthBar/OpponentHealthBar.component";
import { usePlayers } from "../../../../providers/players/players.provider";
import "./OpponentAction.scss";

const PA_OpponentAction: FC = () => {
    const { opponent } = usePlayers();

    return (
        <div className="opponent-action-wrapper">
            <div className="opponent-name">{opponent.opponentName}</div>
            <PA_OpponentHealthBar />
        </div>
    );
};

export default PA_OpponentAction;
