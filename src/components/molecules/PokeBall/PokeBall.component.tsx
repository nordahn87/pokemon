import React, { FC } from "react";
import { useItems } from "../../../providers/items/items.provider";
import "./PokeBall.scss";

const PA_Pokeball: FC = () => {
    const { pokeBall } = useItems();

    return (
        <img
            src={pokeBall.pokeBallSprite}
            ref={pokeBall.pokeBallElement}
            className="poke-ball capture"
            alt="Pokeball"
        />
    );
};

export default PA_Pokeball;
