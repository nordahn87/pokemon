import {FC, useEffect, useState} from "react";
import PA_AttackButton from "../../../atoms/buttons/AttackButton/AttackButton.component";
import PA_CaptureButton from "../../../atoms/buttons/CaptureButton/CaptureButton.component";
import PA_HealingButton from "../../../atoms/buttons/HealingButton/HealingButton.component";
import './PlayerAction.scss'
import PA_PlayerHealthBar from "../../../atoms/healthBar/PlayerHealthBar/PlayerHealthBar.component";
import {PA_API} from "../../../../interface/api";
import {API_BASE_URL} from "../../../../constants/baseUrls";
import {ENDPOINT_PLAYER} from "../../../../constants/endpoints";

const PA_PlayerAction:FC = () => {
    const [playerData, setPlayerData ] = useState<PA_API>({})

    useEffect(() => {
        fetch(`${API_BASE_URL}${ENDPOINT_PLAYER}`)
            .then((response) => response.json())
            .then((data) => {
                setPlayerData(data)
            })
    }, []);


    return (
        <div className="player-action-wrapper">
            <div className="player-name">
                {playerData.name}
            </div>
            <PA_PlayerHealthBar />
            <div className="player-action-container">
                <PA_AttackButton />
                <PA_HealingButton />
                <PA_CaptureButton />
            </div>
        </div>
    );
};

export default PA_PlayerAction;
