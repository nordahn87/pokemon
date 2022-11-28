import {FC} from "react";
import {PA_PlayerProps} from "./Player.props";
import PA_PlayerAction from "../../actions/PlayerAction/PlayerAction.component";
import './Player.scss'

const PA_Player:FC<PA_PlayerProps> = ({
      playerData,
      potionData,
      pokeBallData,
      handlePlayerAttack,
    }) => {

    return (
        <div>
            <div className="player-container">
                <img
                    className="player-pokemon"
                    src={playerData.sprites?.versions["generation-v"]["black-white"].animated.back_default}
                    alt={playerData.species?.name}
                />
            </div>
            <PA_PlayerAction
                playerData={playerData}
                potionData={potionData}
                pokeBallData={pokeBallData}
                handlePlayerAttack={handlePlayerAttack}
            />
        </div>
    );
};

export default PA_Player
