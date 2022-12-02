import React, {FC} from "react";
import {useApiData} from "../../../../hooks/apiData.provider";
import {useOpponent} from "../../../../hooks/players/opponent.provider";
import './Opponent.scss'

const PA_Opponent:FC = () => {

    const { opponentData } = useApiData();
    const { opponentElement } = useOpponent();
    const opponentSprite = opponentData.sprites?.versions["generation-v"]["black-white"].animated.front_default;
    const opponentName = opponentData.species?.name;

    return (
        <div className="opponent-pokemon-container">
            <img
                className="opponent-pokemon"
                ref={opponentElement}
                src={opponentSprite}
                alt={opponentName}
            />
        </div>
    );
};

export default PA_Opponent
