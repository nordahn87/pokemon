import React, { useContext, useRef } from "react";
import { useApiData } from "../data.provider";

const ItemsContext = React.createContext<any>({});

export const ItemsProvider = (props: any): JSX.Element => {
    const { pokeBallData } = useApiData();

    const pokeBallSprite = pokeBallData.sprites?.default;
    const pokeBallElement = useRef(null);

    return (
        <>
            <ItemsContext.Provider
                value={{
                    pokeBall: {
                        pokeBallElement,
                        pokeBallSprite,
                    },
                }}
            >
                {props.children}
            </ItemsContext.Provider>
        </>
    );
};

export const useItems = (): any => useContext(ItemsContext);
