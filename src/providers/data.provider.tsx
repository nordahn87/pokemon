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

    useEffect(() => {
        const fetchHero = fetch(`${API_BASE_URL}/${ENDPOINT_HERO}`);
        const fetchOpponent = fetch(`${API_BASE_URL}/${ENDPOINT_OPPONENT}`);
        const fetchPokeball = fetch(`${API_BASE_URL}/${ENDPOINT_POKEBALL}`);
        const fetchPotion = fetch(`${API_BASE_URL}/${ENDPOINT_POTION}`);

        Promise.all([fetchHero, fetchOpponent, fetchPokeball, fetchPotion])
            .then((values) => {
                return Promise.all(values.map((response) => response.json()));
            })
            .then(([responseHero, responseOpponent, responsePokeball, responsePotion]) => {
                setHeroData(responseHero);
                setOpponentData(responseOpponent);
                setPokeBallData(responsePokeball);
                setPotionData(responsePotion);
            })
            .catch((error) => console.warn(error));
    }, []);

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
