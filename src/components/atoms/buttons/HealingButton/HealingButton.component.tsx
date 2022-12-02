import { FC } from "react";
import { useApiData } from "../../../../hooks/apiData.provider";
import "./HealingButton.scss";

const PA_HealingButton: FC = () => {
    const { potionData } = useApiData();
    const potionSprite = potionData.sprites?.default;

    return (
        <button
            className="healing-button-container"
            onClick={() => console.log("Use potion")}
        >
            <img className="icon" src={potionSprite} alt="Pokeball" />
            {potionData.name}
        </button>
    );
};

export default PA_HealingButton;
