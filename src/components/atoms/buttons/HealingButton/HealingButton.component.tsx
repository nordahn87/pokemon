import { FC } from "react";
import { useApiData } from "../../../../hooks/apiData.provider";
import { useGameState } from "../../../../hooks/gamestate.provider";
import { PA_HealingButtonProps } from "./HealingButton.props";
import "./HealingButton.scss";

const PA_HealingButton: FC<PA_HealingButtonProps> = (props) => {
    const { potionData } = useApiData();
    const { isGameStateHeroReady } = useGameState();
    const potionSprite = potionData.sprites?.default;

    return (
        <button
            className="healing-button-container"
            onClick={props.handleHealingPotion}
            disabled={isGameStateHeroReady}
        >
            <img className="icon" src={potionSprite} alt="Pokeball" />
            {potionData.name}
        </button>
    );
};

export default PA_HealingButton;
