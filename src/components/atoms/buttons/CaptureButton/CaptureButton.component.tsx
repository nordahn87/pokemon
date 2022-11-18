import {FC} from "react";
import {PA_CaptureButtonProps} from "./CaptureButton.props";
import "./CaptureButton.scss"

const PA_CaptureButton:FC<PA_CaptureButtonProps> = ({pokeballData}) => {
    return (
        <>
            <button className="btn-capture-container" onClick={() => console.log("Capture pokemon")}>
                    <img className="icon" src={pokeballData.sprites?.default} alt="Pokeball" />
                    {pokeballData.name?.replace('-',' ')}
            </button>
        </>
    );
};

export default PA_CaptureButton;
