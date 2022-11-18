import {FC} from "react";
import {PA_CaptureButtonProps} from "./CaptureButton.props";
import "./CaptureButton.scss"

const PA_CaptureButton:FC<PA_CaptureButtonProps> = ({pokeBallData}) => {
    return (
        <>
            <button className="btn-capture-container" onClick={() => console.log("Capture pokemon")}>
                    <img className="icon" src={pokeBallData.sprites?.default} alt="Pokeball" />
                    {pokeBallData.name?.replace('-',' ')}
            </button>
        </>
    );
};

export default PA_CaptureButton;
