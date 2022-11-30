import {FC} from "react";
import PA_OpponentAction from "../../actions/OpponentAction/OpponentAction.component";
import {usePokemons} from "../../../../hooks/pokemon.provider";
import {PA_OpponentProps} from "./Opponent.props";
import './Opponent.scss'

const PA_Opponent:FC<PA_OpponentProps> = ({opponentData, currentOppponentHealth}) => {

    const { opponentElement } = usePokemons();

    return (
        <div className="opponent-pokemon-container">
            <img
                className="opponent-pokemon"
                ref={opponentElement}
                src={opponentData.sprites?.versions["generation-v"]["black-white"].animated.front_default}
                alt={opponentData.species?.name} />
        </div>
    );
};

export default PA_Opponent
