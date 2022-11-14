import {FC, useEffect, useState} from "react";
import {API_BASE_URL, ENDPOINT_OPPONENT} from "../constants/baseUrls";
import {PA_Pokemon} from "../interface/pokemon";
import '../opponent/Opponent.css'
import HealthBar from "./HealthBar.component";

const PA_Opponent:FC = () => {
    const [playerData, setPlayerData ] = useState<PA_Pokemon>({})

useEffect(() => {
    fetch(`${API_BASE_URL}${ENDPOINT_OPPONENT}`)
        .then((response) => response.json())
        .then((data) => {
            setPlayerData(data)
        })
}, []);

    return (
        <div>
            <img className="opponent-pokemon" src={playerData.sprites?.front_default} alt={playerData.species?.name} />
            <HealthBar />
        </div>
    );
};

export default PA_Opponent
