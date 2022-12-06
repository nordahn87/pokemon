import React, { useContext, useState } from "react";
import { GameStateEnum } from "../models/gameState.enum";

const GameStateContext = React.createContext<any>({});

export const GameStateProvider = (props: any): JSX.Element => {
    // Game states
    const [gameState, setGameState] = useState(GameStateEnum.GAME_IDLE);

    return (
        <>
            <GameStateContext.Provider
                value={{
                    gameState,
                    setGameState,
                }}
            >
                {props.children}
            </GameStateContext.Provider>
        </>
    );
};

export const useGameState = (): any => useContext(GameStateContext);
