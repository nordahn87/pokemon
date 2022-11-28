import {FC} from "react";
import {PA_PlayerProps} from "./Player.props";
import PA_PlayerAction from "../../actions/PlayerAction/PlayerAction.component";
import {usePokemons} from "../../../../hooks/pokemon.provider";
import {ClassListRemove} from "../../../../helpers/classList.helper";
import './Player.scss'

const PA_Player:FC<PA_PlayerProps> = ({
      playerData,
      potionData,
      pokeBallData,
      handlePlayerAttack,
      buttonDisabled,
      setButtonDisabled
    }) => {

    const { playerElement, opponentElement } = usePokemons();

    const attackAnimationEnd = () => {
        ClassListRemove(playerElement, "quick-attack-animation");
        ClassListRemove(opponentElement, "damage-taken-animation");
        setButtonDisabled(false)
    }

    return (
        <div>
            <div className="player-container">
                <img
                    className="player-pokemon"
                    ref={playerElement}
                    onAnimationEnd={attackAnimationEnd}
                    src={playerData.sprites?.versions["generation-v"]["black-white"].animated.back_default}
                    alt={playerData.species?.name}
                />
            </div>
            <PA_PlayerAction
                playerData={playerData}
                potionData={potionData}
                pokeBallData={pokeBallData}
                handlePlayerAttack={handlePlayerAttack}
                attackAnimationEnd={attackAnimationEnd}
                buttonDisabled={buttonDisabled}
            />
        </div>
    );
};

export default PA_Player
