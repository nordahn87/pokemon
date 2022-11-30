import {FC} from "react";
import {PA_PlayerProps} from "./Player.props";
import {usePokemons} from "../../../../hooks/pokemon.provider";
import './Player.scss'

const PA_Player:FC<PA_PlayerProps> = ({
      playerData,
      attackAnimationEnd
    }) => {

    const { playerElement } = usePokemons();

    return (
        <div className="player-container">
            <img
                className="player-pokemon"
                ref={playerElement}
                onAnimationEnd={attackAnimationEnd}
                src={playerData.sprites?.versions["generation-v"]["black-white"].animated.back_default}
                alt={playerData.species?.name}
            />
        </div>
    );
};

export default PA_Player
