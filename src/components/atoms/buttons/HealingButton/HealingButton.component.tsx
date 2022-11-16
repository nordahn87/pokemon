import {FC, useEffect, useState} from "react";
import {API_BASE_URL} from "../../../../constants/baseUrls";
import {ENDPOINT_POTION} from "../../../../constants/endpoints";
import {PA_API} from "../../../../interface/api";
import "./HealingButton.scss"

const PA_HealingButton:FC = () => {
    const [potionData, setPotionData ] = useState<PA_API>({})

    useEffect(() => {
        fetch(`${API_BASE_URL}${ENDPOINT_POTION}`)
            .then((response) => response.json())
            .then((data) => {
                setPotionData(data)
            })
    }, [potionData]);

    return (
        <button className="btn-healing-container" onClick={() => console.log("Use potion")}>
            <img className="icon" src={potionData.sprites?.default} alt="Pokeball" />
            {potionData.name}
        </button>
    );
};

export default PA_HealingButton;
