import React, { useContext, useState } from "react";
import { GameStateEnum } from "../models/gameState.enum";

const GameStateContext = React.createContext<any>({});

export const GameStateProvider = (props: any): JSX.Element => {
    // Game states
    const [gameState, setGameState] = useState(GameStateEnum.GAME_IDLE);

    const isGameStateHeroReady = gameState !== GameStateEnum.HERO_READY;
    const isGameStateOpponentReady = gameState !== GameStateEnum.OPPONENT_READY;

    return (
        <>
            <GameStateContext.Provider
                value={{
                    gameState,
                    setGameState,
                    isGameStateHeroReady,
                    isGameStateOpponentReady,
                }}
            >
                {props.children}
            </GameStateContext.Provider>
        </>
    );
};

export const useGameState = (): any => useContext(GameStateContext);
