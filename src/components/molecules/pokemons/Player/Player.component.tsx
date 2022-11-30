import {FC} from "react";
import {PA_PlayerProps} from "./Player.props";
import {usePokemons} from "../../../../hooks/pokemon.provider";
import './Player.scss'

const PA_Player:FC<PA_PlayerProps> = (props) => {

    const { playerElement } = usePokemons();
    const playerSprite = props.playerData.sprites?.versions["generation-v"]["black-white"].animated.back_default;
    const playerName = props.playerData.species?.name;

    return (
        <div className="player-container">
            <img
                className="player-pokemon"
                ref={playerElement}
                onAnimationEnd={props.attackAnimationEnd}
                src={playerSprite}
                alt={playerName}
            />
        </div>
    );
};

export default PA_Player
