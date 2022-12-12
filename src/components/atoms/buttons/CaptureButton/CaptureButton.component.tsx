import { FC } from "react";
import { useApiData } from "../../../../hooks/apiData.provider";
import "./CaptureButton.scss";

const PA_CaptureButton: FC = () => {
    const { pokeBallData } = useApiData();
    const pokeBallSprite = pokeBallData.sprites?.default;
    const pokeBallName = pokeBallData.name;

    return (
        <>
            <button className="capture-button-container" onClick={() => console.log("Capture pokemon")}>
                <img className="icon" src={pokeBallSprite} alt="Pokeball" />
                {pokeBallName?.replace("-", " ")}
            </button>
        </>
    );
};

export default PA_CaptureButton;
