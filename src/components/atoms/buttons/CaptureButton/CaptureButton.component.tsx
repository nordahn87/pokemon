import { FC } from "react";
import { useApiData } from "../../../../hooks/apiData.provider";
import "./CaptureButton.scss";
import { useGameState } from "../../../../hooks/gamestate.provider";

const PA_CaptureButton: FC = () => {
    const { pokeBallData } = useApiData();
    const { isGameStateHeroReady } = useGameState();
    const pokeBallSprite = pokeBallData.sprites?.default;
    const pokeBallName = pokeBallData.name;

    return (
        <>
            <button
                className="capture-button-container"
                onClick={() => console.log("Capture pokemon")}
                disabled={isGameStateHeroReady}
            >
                <img className="icon" src={pokeBallSprite} alt="Pokeball" />
                {pokeBallName?.replace("-", " ")}
            </button>
        </>
    );
};

export default PA_CaptureButton;
