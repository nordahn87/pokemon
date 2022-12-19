import { FC } from "react";
import { PA_CaptureButtonProps } from "./CaptureButton.props";
import { useApiData } from "../../../../hooks/apiData.provider";
import { useGameState } from "../../../../hooks/gamestate.provider";
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
