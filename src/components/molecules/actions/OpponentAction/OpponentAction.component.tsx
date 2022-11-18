import {FC} from "react";
import {PA_OpponentActionProps} from "./OpponentAction.props";
import PA_OpponentHealthBar from "../../../atoms/healthBar/OpponentHealthBar/OpponentHealthBar.component";
import './OpponentAction.scss'

const PA_OpponentAction:FC<PA_OpponentActionProps> = ({opponentData}) => {
    return (
        <div className="opponent-action-wrapper">
            <div className="opponent-name">
                {opponentData.name}
            </div>
            <PA_OpponentHealthBar />
        </div>
    );
};

export default PA_OpponentAction;
