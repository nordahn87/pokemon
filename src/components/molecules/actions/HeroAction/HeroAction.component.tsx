import { FC } from "react";
import { PA_HeroActionProps } from "./HeroAction.props";
import { useApiData } from "../../../../hooks/apiData.provider";
import PA_PlayerHealthBar from "../../../atoms/healthBar/HeroHealthBar/HeroHealthBar.component";
import PA_AttackButton from "../../../atoms/buttons/AttackButton/AttackButton.component";
import PA_CaptureButton from "../../../atoms/buttons/CaptureButton/CaptureButton.component";
import PA_HealingButton from "../../../atoms/buttons/HealingButton/HealingButton.component";
import "./HeroAction.scss";
import { useGameState } from "../../../../hooks/gamestate.provider";

const PA_HeroAction: FC<PA_HeroActionProps> = (props) => {
    const { heroData } = useApiData();
    const { isGameStateOpponentReady } = useGameState();

    return (
        <div className="hero-action-wrapper">
            <div className="hero-name">{heroData.name}</div>

            <PA_PlayerHealthBar />

            {isGameStateOpponentReady ? (
                <div className="hero-action-container">
                    <PA_AttackButton handleHeroAttack={props.handleHeroAttack} />
                    <PA_HealingButton handleHealingPotion={props.handleHealingPotion} />
                    <PA_CaptureButton />
                </div>
            ) : (
                <div className="opponents-turn-container">Opponents turn</div>
            )}
        </div>
    );
};

export default PA_HeroAction;
