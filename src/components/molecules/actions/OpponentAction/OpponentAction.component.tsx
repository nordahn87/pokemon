import { FC } from "react";
import { useApiData } from "../../../../hooks/apiData.provider";
import PA_OpponentHealthBar from "../../../atoms/healthBar/OpponentHealthBar/OpponentHealthBar.component";
import "./OpponentAction.scss";

const PA_OpponentAction: FC = () => {
    const { opponentData } = useApiData();
    const opponentName = opponentData.name;

    return (
        <div className="opponent-action-wrapper">
            <div className="opponent-name">{opponentName}</div>
            <PA_OpponentHealthBar />
        </div>
    );
};

export default PA_OpponentAction;
