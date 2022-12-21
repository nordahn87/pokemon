import React, { useContext, useEffect, useState } from "react";
import { PA_API } from "../interface/api";
import { FetchApi } from "../helpers/api.helper";
import { ENDPOINT_HERO, ENDPOINT_OPPONENT, ENDPOINT_POKEBALL, ENDPOINT_POTION } from "../constants/endpoints";

const ApiDataContext = React.createContext<any>({});

export const ApiDataProvider = (props: any): JSX.Element => {
    const [heroData, setHeroData] = useState<PA_API>({});
    const [opponentData, setOpponentData] = useState<PA_API>({});
    const [potionData, setPotionData] = useState<PA_API>({});
    const [pokeBallData, setPokeBallData] = useState<PA_API>({});

    useEffect(() => {
        FetchApi(ENDPOINT_HERO).then((data) => {
            setHeroData(data);
        });
    }, [setHeroData]);

    useEffect(() => {
        FetchApi(ENDPOINT_OPPONENT).then((data) => {
            setOpponentData(data);
        });
    }, [setOpponentData]);

    useEffect(() => {
        FetchApi(ENDPOINT_POTION).then((data) => {
            setPotionData(data);
        });
    }, [setPotionData]);

    useEffect(() => {
        FetchApi(ENDPOINT_POKEBALL).then((data) => {
            setPokeBallData(data);
        });
    }, [setPokeBallData]);

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
