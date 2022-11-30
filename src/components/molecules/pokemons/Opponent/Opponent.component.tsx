import {FC} from "react";
import {usePokemons} from "../../../../hooks/pokemon.provider";
import {useApiData} from "../../../../hooks/apiData.provider";
import './Opponent.scss'

const PA_Opponent:FC = () => {

    const { opponentData } = useApiData();
    const { opponentElement } = usePokemons();
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
