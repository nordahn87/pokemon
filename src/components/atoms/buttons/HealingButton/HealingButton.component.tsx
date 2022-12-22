import { FC } from "react";
import { useApiData } from "../../../../providers/data.provider";
import { PA_HealingButtonProps } from "./HealingButton.props";
import "./HealingButton.scss";
import { useGameState } from "../../../../providers/gamestate.provider";

const PA_HealingButton: FC<PA_HealingButtonProps> = (props) => {
    const { potionData } = useApiData();
    const { isGameStateHeroDone } = useGameState();
    const potionSprite = potionData.sprites?.default;

    return (
        <button className="healing-button-container" disabled={isGameStateHeroDone} onClick={props.handleHealingPotion}>
            <img className="icon" src={potionSprite} alt="Pokeball" />
            {potionData.name}
        </button>
    );
};

export default PA_HealingButton;
