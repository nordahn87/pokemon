import { FC } from "react";
import { useApiData } from "../../../../providers/data.provider";
import "./CaptureButton.scss";
import { useGameState } from "../../../../providers/gamestate.provider";

const PA_CaptureButton: FC = () => {
    const { pokeBallData } = useApiData();
    const { isGameStateHeroDone } = useGameState();
    const pokeBallSprite = pokeBallData.sprites?.default;
    const pokeBallName = pokeBallData.name;

    return (
        <>
            <button
                className="capture-button-container"
                disabled={isGameStateHeroDone}
                onClick={() => console.log("Capture pokemon")}
            >
                <img className="icon" src={pokeBallSprite} alt="Pokeball" />
                {pokeBallName?.replace("-", " ")}
            </button>
        </>
    );
};

export default PA_CaptureButton;
