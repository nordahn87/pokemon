import {FC} from "react";
import {PA_HealingButtonProps} from "./HealingButton.props";
import "./HealingButton.scss"

const PA_HealingButton:FC<PA_HealingButtonProps> = ({potionData}) => {
    return (
        <button className="btn-healing-container" onClick={() => console.log("Use potion")}>
            <img className="icon" src={potionData.sprites?.default} alt="Pokeball" />
            {potionData.name}
        </button>
    );
};

export default PA_HealingButton;
