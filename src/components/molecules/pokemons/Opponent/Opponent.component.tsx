import {FC} from "react";
import PA_OpponentAction from "../../actions/OpponentAction/OpponentAction.component";
import {PA_OpponentProps} from "./Opponent.props";
import './Opponent.scss'

const PA_Opponent:FC<PA_OpponentProps> = ({opponentData, currentOppponentHealth}) => {
    return (
        <div>
            <PA_OpponentAction
                opponentData={opponentData}
                currentOppponentHealth={currentOppponentHealth}/>
            <div className="opponent-pokemon-container">
                <img
                    className="opponent-pokemon"
                    src={opponentData.sprites?.versions["generation-v"]["black-white"].animated.front_default}
                    alt={opponentData.species?.name} />
            </div>
        </div>
    );
};

export default PA_Opponent
