import { FC } from "react";
import { useApiData } from "../../../../hooks/apiData.provider";
import { PA_HealingButtonProps } from "./HealingButton.props";
import "./HealingButton.scss";

const PA_HealingButton: FC<PA_HealingButtonProps> = (props) => {
    const { potionData } = useApiData();
    const potionSprite = potionData.sprites?.default;

    return (
        <button className="healing-button-container" onClick={props.handleHealingPotion}>
            <img className="icon" src={potionSprite} alt="Pokeball" />
            {potionData.name}
        </button>
    );
};

export default PA_HealingButton;
