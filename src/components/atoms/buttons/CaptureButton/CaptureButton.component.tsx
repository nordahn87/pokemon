import {FC, useEffect, useState} from "react";
import {API_BASE_URL} from "../../../../constants/baseUrls";
import {ENDPOINT_POKEBALL} from "../../../../constants/endpoints";
import {PA_API} from "../../../../interface/api";
import "./CaptureButton.scss"

const PA_CaptureButton:FC = () => {
    const [pokeballData, setPokeballData ] = useState<PA_API>({})
    
    useEffect(() => {
        fetch(`${API_BASE_URL}${ENDPOINT_POKEBALL}`)
            .then((response) => response.json())
            .then((data) => {
                setPokeballData(data)
            })
    }, []);

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