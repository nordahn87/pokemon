import {FC} from "react";
import {PA_PlayerActionProps} from "./PlayerAction.props";
import PA_PlayerHealthBar from "../../../atoms/healthBar/PlayerHealthBar/PlayerHealthBar.component";
import PA_AttackButton from "../../../atoms/buttons/AttackButton/AttackButton.component";
import PA_CaptureButton from "../../../atoms/buttons/CaptureButton/CaptureButton.component";
import PA_HealingButton from "../../../atoms/buttons/HealingButton/HealingButton.component";
import './PlayerAction.scss'

const PA_PlayerAction:FC<PA_PlayerActionProps> = ({playerData, potionData, pokeballData}) => {
    return (
        <div className="player-action-wrapper">
            <div className="player-name">
                {playerData.name}
            </div>
            <PA_PlayerHealthBar />
            <div className="player-action-container">
                <PA_AttackButton playerData={playerData}/>
                <PA_HealingButton potionData={potionData} />
                <PA_CaptureButton pokeballData={pokeballData} />
            </div>
        </div>
    );
};

export default PA_PlayerAction;
