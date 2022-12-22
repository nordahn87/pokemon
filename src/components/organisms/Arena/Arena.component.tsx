import React, { FC, useEffect } from "react";
import { GameStateEnum } from "../../../models/gameState.enum";
import { MessagesEnum } from "../../../models/messages.enum";
import { useApiData } from "../../../providers/data.provider";
import { useMessages } from "../../../providers/messages.provider";
import { usePlayers } from "../../../providers/players/players.provider";
import { useGameState } from "../../../providers/gamestate.provider";
import PA_Hero from "../../molecules/pokemons/Hero/Hero.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import PA_HeroAction from "../../molecules/actions/HeroAction/HeroAction.component";
import PA_OpponentAction from "../../molecules/actions/OpponentAction/OpponentAction.component";
import PA_MessageBox from "../../molecules/MessageBox/MessageBox.component";
import PA_GameStates from "../../molecules/gameStates/GameStates.component";
import { usePotion } from "../../../providers/players/hooks/userPotions.hooks";
import { useOpponentAttack } from "../../../providers/players/hooks/attack/useOpponentAttack.hooks";
import { useHeroAttack } from "../../../providers/players/hooks/attack/useHeroAttack.hooks";
import { useHeroAttackCallback } from "../../../providers/players/hooks/attackCallback/useHeroAttackCallback.hook";
import { useOpponentAttackCallback } from "../../../providers/players/hooks/attackCallback/useOpponentAttackCallback.hook";
import { useTurnOrder } from "../../../hooks/useTurnOrder.hook";
import "./Arena.scss";

const PA_Arena: FC = () => {
    const { heroData, opponentData } = useApiData();
    const { gameState, setGameState, isGameStateOpponentReady } = useGameState();
    const { message, clearMessage, showMessage } = useMessages();

    const {
        currentOpponentHealth,
        SetCurrentOpponentHealth,
        currentHeroHealth,
        setCurrentHeroHealth,
        heroAttackDamage,
        opponentAttackDamage,
        maxHeroHealth,
    } = usePlayers();

    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;

    // Hero actions
    const { handleHeroAttack } = useHeroAttack(clearMessage);
    const { opponentAttackCallback } = useOpponentAttackCallback(
        heroName,
        opponentName,
        currentHeroHealth,
        opponentAttackDamage,
        setCurrentHeroHealth,
    );
    const { handleHealingPotion } = usePotion(heroName, currentHeroHealth, maxHeroHealth, setCurrentHeroHealth);

    // Opponent actions
    const { handleOpponentAttack } = useOpponentAttack(clearMessage);
    const { heroAttackCallback } = useHeroAttackCallback(
        heroName,
        opponentName,
        currentOpponentHealth,
        heroAttackDamage,
        SetCurrentOpponentHealth,
    );

    // Initial encounter turn order
    const { turnOrder } = useTurnOrder();

    // TODO Have to fix this at some point
    // Games initial encounter
    useEffect(() => {
        if (gameState === GameStateEnum.GAME_INIT && heroName && opponentName) {
            turnOrder();
        }

        if (gameState === GameStateEnum.HERO_DONE && message === undefined) {
            showMessage(MessagesEnum.OPPONENT_MESSAGE_TURN, opponentName);
            setGameState(GameStateEnum.OPPONENT_READY);
        }

        if (gameState === GameStateEnum.OPPONENT_DONE && message === undefined) {
            showMessage(MessagesEnum.HERO_MESSAGE_TURN, heroName);
            setGameState(GameStateEnum.HERO_READY);
        }
    }, [gameState, heroName, message, opponentName, setGameState, showMessage, turnOrder]);

    return (
        <>
            <PA_GameStates />
            <div className="arena-wrapper">
                <div>
                    {message && message !== "" ? <PA_MessageBox /> : null}

                    <PA_Hero heroAttackCallback={heroAttackCallback} />

                    <PA_HeroAction
                        heroName={heroName}
                        handleHeroAttack={handleHeroAttack}
                        handleHealingPotion={handleHealingPotion}
                    />
                </div>

                <div>
                    <PA_OpponentAction />
                    <PA_Opponent opponentAttackCallback={opponentAttackCallback} />

                    {/* TODO This has to be a function running when hero has finished his turn*/}
                    <button onClick={handleOpponentAttack} disabled={isGameStateOpponentReady}>
                        ** TEMP Opponent Attack
                    </button>
                </div>

                <div className="arena-scene">
                    <span className="skye"></span>
                    <span className="ground"></span>
                </div>
            </div>
        </>
    );
};

export default PA_Arena;
