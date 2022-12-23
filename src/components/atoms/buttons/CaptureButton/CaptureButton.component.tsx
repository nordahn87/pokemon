import { FC } from "react";
import { useApiData } from "../../../../providers/data.provider";
import { useGameState } from "../../../../providers/gamestate.provider";
import { PA_CaptureButtonProps } from "./CaptureButton.props";
import "./CaptureButton.scss";

const PA_CaptureButton: FC<PA_CaptureButtonProps> = (props) => {
    const { pokeBallData } = useApiData();
    const { isGameStateHeroDone } = useGameState();
    const pokeBallSprite = pokeBallData.sprites?.default;
    const pokeBallName = pokeBallData.name;

    return (
        <>
            <button
                className="capture-button-container"
                disabled={isGameStateHeroDone}
                onClick={props.handleCaptureOpponent}
            >
                <img className="icon" src={pokeBallSprite} alt="Pokeball" />
                {pokeBallName?.replace("-", " ")}
            </button>
        </>
    );
};

export default PA_CaptureButton;
