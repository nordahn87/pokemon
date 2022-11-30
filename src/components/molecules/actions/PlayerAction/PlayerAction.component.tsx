import {FC} from "react";
import {PA_PlayerActionProps} from "./PlayerAction.props";
import {useApiData} from "../../../../hooks/apiData.provider";
import PA_PlayerHealthBar from "../../../atoms/healthBar/PlayerHealthBar/PlayerHealthBar.component";
import PA_AttackButton from "../../../atoms/buttons/AttackButton/AttackButton.component";
import PA_CaptureButton from "../../../atoms/buttons/CaptureButton/CaptureButton.component";
import PA_HealingButton from "../../../atoms/buttons/HealingButton/HealingButton.component";
import './PlayerAction.scss'

const PA_PlayerAction:FC<PA_PlayerActionProps> = (props) => {

    const { playerData } = useApiData();

    return (
        <div className="player-action-wrapper">
            <div className="player-name">
                {playerData.name}
            </div>

            <PA_PlayerHealthBar />

            <div className="player-action-container">
                <PA_AttackButton
                    handlePlayerAttack={props.handlePlayerAttack}
                    buttonDisabled={props.buttonDisabled}
                />

                <PA_HealingButton />

                <PA_CaptureButton />
            </div>
        </div>
    );
};

export default PA_PlayerAction;
