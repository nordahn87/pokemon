import {FC} from "react";
import {PA_OpponentActionProps} from "./OpponentAction.props";
import {useApiData} from "../../../../hooks/apiData.provider";
import PA_OpponentHealthBar from "../../../atoms/healthBar/OpponentHealthBar/OpponentHealthBar.component";
import './OpponentAction.scss'

const PA_OpponentAction:FC<PA_OpponentActionProps> = (props) => {

    const { opponentData } = useApiData();
    const opponentName = opponentData.name;

    return (
        <div className="opponent-action-wrapper">
            <div className="opponent-name">
                {opponentName}
            </div>
            <PA_OpponentHealthBar currentOppponentHealth={props.currentOppponentHealth} />
        </div>
    );
};

export default PA_OpponentAction;
