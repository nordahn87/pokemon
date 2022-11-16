import {FC, useEffect, useState} from "react";
import {API_BASE_URL} from "../../../../constants/baseUrls";
import {ENDPOINT_OPPONENT} from "../../../../constants/endpoints";
import {PA_API} from "../../../../interface/api";
import PA_OpponentAction from "../../actions/OpponentAction/OpponentAction.component";
import './Opponent.scss'

const PA_Opponent:FC = () => {
    const [opponentData, setOpponentData ] = useState<PA_API>({})

    useEffect(() => {
        fetch(`${API_BASE_URL}${ENDPOINT_OPPONENT}`)
            .then((response) => response.json())
            .then((data) => {
                setOpponentData(data)
            })
    }, []);

    return (
        <div>
            <PA_OpponentAction />
            <img className="opponent-pokemon" src={opponentData.sprites?.front_default} alt={opponentData.species?.name} />
        </div>
    );
};

export default PA_Opponent
