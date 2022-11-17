import {FC, useEffect, useState} from "react";
import {ENDPOINT_OPPONENT} from "../../../../constants/endpoints";
import {PA_API} from "../../../../interface/api";
import {FetchApi} from "../../../../helpers/api.helper"
import PA_OpponentAction from "../../actions/OpponentAction/OpponentAction.component";
import './Opponent.scss'

const PA_Opponent:FC = () => {
    const [opponentData, setOpponentData ] = useState<PA_API>({})

    useEffect(() => {
        FetchApi(ENDPOINT_OPPONENT)
                .then((data) => {
                    setOpponentData(data)
                })
    }, [setOpponentData]);

    return (
        <div>
            <PA_OpponentAction />
            <div className="opponent-pokemon-container">
                <img className="opponent-pokemon" src={opponentData.sprites?.versions["generation-v"]["black-white"].animated.front_default} alt={opponentData.species?.name} />
            </div>
        </div>
    );
};

export default PA_Opponent
