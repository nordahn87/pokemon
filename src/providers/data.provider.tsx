import React, { useContext, useEffect, useState } from "react";
import { PA_API } from "../interface/api";
import { API_BASE_URL } from "../constants/baseUrls";
import { ENDPOINT_HERO, ENDPOINT_OPPONENT, ENDPOINT_POKEBALL, ENDPOINT_POTION } from "../constants/endpoints";

const ApiDataContext = React.createContext<any>({});

export const DataProvider = (props: any): JSX.Element => {
    const [heroData, setHeroData] = useState<PA_API>({});
    const [opponentData, setOpponentData] = useState<PA_API>({});
    const [potionData, setPotionData] = useState<PA_API>({});
    const [pokeBallData, setPokeBallData] = useState<PA_API>({});

    const fetchHero = fetch(`${API_BASE_URL}/${ENDPOINT_HERO}`);
    const fetchOpponent = fetch(`${API_BASE_URL}/${ENDPOINT_OPPONENT}`);
    const fetchPokeball = fetch(`${API_BASE_URL}/${ENDPOINT_POKEBALL}`);
    const fetchPortion = fetch(`${API_BASE_URL}/${ENDPOINT_POTION}`);

    useEffect(() => {
        Promise.all([fetchHero, fetchOpponent, fetchPokeball, fetchPortion])
            .then((values) => {
                return Promise.all(values.map((response) => response.json()));
            })
            .then(([responseHero, responseOpponent, responsePokeball, responsePortion]) => {
                setHeroData(responseHero);
                setOpponentData(responseOpponent);
                setPotionData(responsePokeball);
                setPokeBallData(responsePortion);
            })
            .catch((error) => console.warn(error));
    }, [fetchHero, fetchOpponent, fetchPokeball, fetchPortion]);

    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;
    const pokeBallSprite = pokeBallData.sprites?.default;
    const pokeBallName = pokeBallData.name;
    const potionSprite = potionData.sprites?.default;
    const moves = heroData.moves?.filter((item: any) => {
        return item.move.name === "quick-attack";
    });

    return (
        <ApiDataContext.Provider
            value={{
                heroData,
                opponentData,
                potionData,
                pokeBallData,
            }}
        >
            {props.children}
        </ApiDataContext.Provider>
    );
};

export const useApiData = (): any => useContext(ApiDataContext);
