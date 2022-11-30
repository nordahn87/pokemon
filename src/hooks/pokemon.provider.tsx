import React, {useContext, useRef} from "react";

const PokemonContext = React.createContext<any>({});

export const  PokemonProvider = ({ children }: any): JSX.Element => {
    const playerElement = useRef(null);
    const opponentElement = useRef(null);

    return (
        <PokemonContext.Provider value={{
            playerElement,
            opponentElement
        }}>
            {children}
        </PokemonContext.Provider>
    );
}

export const usePokemons = (): any => useContext(PokemonContext);
