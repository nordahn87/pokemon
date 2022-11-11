import {FC, useEffect, useState} from "react";
import '../opponent/Opponent.css'

type Opponent = {
    [key: string]: any
}

const PA_Opponent:FC = () => {
    const [playerData, setPlayerData ] = useState<Opponent>({})

useEffect(() => {
    fetch("./data/opponent.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setPlayerData(data)
        })
}, []);

    return (
        <div>
            <img className="opponent-pokemon" src={playerData.sprites?.front_default} alt={playerData.species?.name} />
        </div>
    );
};

export default PA_Opponent
