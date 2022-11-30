import React, {useContext, useRef} from "react";

const PokemonContext = React.createContext<any>({});

export const  PokemonProvider = ({ children }: any): JSX.Element => {
    const heroElement = useRef(null);
    const opponentElement = useRef(null);

    return (
        <PokemonContext.Provider value={{
            heroElement,
            opponentElement
        }}>
            {children}
        </PokemonContext.Provider>
    );
}

export const usePokemons = (): any => useContext(PokemonContext);
