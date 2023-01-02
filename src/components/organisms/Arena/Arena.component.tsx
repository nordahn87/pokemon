import React, { FC, useEffect } from "react";
import { GameStateEnum } from "../../../models/gameState.enum";
import { MessagesEnum } from "../../../models/messages.enum";
import { useMessages } from "../../../providers/messages.provider";
import { usePlayers } from "../../../providers/players/players.provider";
import { useGameState } from "../../../providers/gamestate.provider";
import { usePotion } from "../../../providers/players/hooks/items/userPotions.hooks";
import { useOpponentAttack } from "../../../providers/players/hooks/attack/useOpponentAttack.hooks";
import { useHeroAttack } from "../../../providers/players/hooks/attack/useHeroAttack.hooks";
import { useHeroAttackCallback } from "../../../providers/players/hooks/attackCallback/useHeroAttackCallback.hook";
import { useOpponentAttackCallback } from "../../../providers/players/hooks/attackCallback/useOpponentAttackCallback.hook";
import { useTurnOrder } from "../../../hooks/useTurnOrder.hook";
import { useCaptureOpponent } from "../../../hooks/useCaptureOpponent.hook";
import PA_Hero from "../../molecules/pokemons/Hero/Hero.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import PA_HeroAction from "../../molecules/actions/HeroAction/HeroAction.component";
import PA_OpponentAction from "../../molecules/actions/OpponentAction/OpponentAction.component";
import PA_MessageBox from "../../molecules/MessageBox/MessageBox.component";
import PA_GameStates from "../../molecules/gameStates/GameStates.component";
import "./Arena.scss";

const PA_Arena: FC = () => {
    const { hero, opponent } = usePlayers();
    const { gameState, setGameState, isGameStateOpponentReady } = useGameState();
    const { message, clearMessage, showMessage } = useMessages();

    // Hero actions
    const { handleHeroAttack } = useHeroAttack(clearMessage);
    const { opponentAttackCallback } = useOpponentAttackCallback(
        hero.heroName,
        opponent.opponentName,
        hero.health.currentHeroHealth,
        opponent.damage.opponentAttackDamage,
        hero.health.setCurrentHeroHealth,
    );
    const { handleHealingPotion } = usePotion(
        hero.heroName,
        hero.health.currentHeroHealth,
        hero.health.maxHeroHealth,
        hero.health.setCurrentHeroHealth,
    );

    const { handleCaptureOpponent, captureOpponent } = useCaptureOpponent(
        opponent.health.currentOpponentHealth,
        opponent.health.maxOpponentHealth,
    );

    // Opponent actions
    const { handleOpponentAttack } = useOpponentAttack(clearMessage);
    const { heroAttackCallback } = useHeroAttackCallback(
        hero.heroName,
        opponent.opponentName,
        opponent.health.currentOpponentHealth,
        hero.damage.heroAttackDamage,
        opponent.health.setCurrentOpponentHealth,
    );

    // Initial encounter turn order
    const { turnOrder } = useTurnOrder();

    // TODO Have to fix this at some point
    // Games initial encounter
    useEffect(() => {
        if (gameState === GameStateEnum.GAME_INIT && hero.heroName && opponent.opponentName) {
            turnOrder();
        }

        if (gameState === GameStateEnum.HERO_DONE && message === undefined) {
            showMessage(MessagesEnum.OPPONENT_MESSAGE_TURN, opponent.opponentName);
            setGameState(GameStateEnum.OPPONENT_READY);
        }

        if (gameState === GameStateEnum.OPPONENT_DONE && message === undefined) {
            showMessage(MessagesEnum.HERO_MESSAGE_TURN, hero.heroName);
            setGameState(GameStateEnum.HERO_READY);
        }
    }, [gameState, hero.heroName, message, opponent.opponentName, setGameState, showMessage, turnOrder]);

    return (
        <>
            <PA_GameStates />
            <div className="arena-wrapper">
                <div>
                    {message && message !== "" ? <PA_MessageBox /> : null}

                    <PA_Hero heroAttackCallback={heroAttackCallback} />

                    <PA_HeroAction
                        handleHeroAttack={handleHeroAttack}
                        handleHealingPotion={handleHealingPotion}
                        handleCaptureOpponent={handleCaptureOpponent}
                    />
                </div>

                <div>
                    <PA_OpponentAction />
                    <PA_Opponent opponentAttackCallback={opponentAttackCallback} captureOpponent={captureOpponent} />

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
