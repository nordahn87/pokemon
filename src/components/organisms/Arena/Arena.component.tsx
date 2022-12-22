import React, { FC, useCallback, useEffect } from "react";
import { GameStateEnum } from "../../../models/gameState.enum";
import { MessagesEnum } from "../../../models/messages.enum";
import { TURN_ORDER_CHANCE } from "../../../constants/turnOrderChance";
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
import "./Arena.scss";
import { useHeroAttackCallback } from "../../../providers/players/hooks/attackCallback/useHeroAttackCallback.hook";
import { useOpponentAttackCallback } from "../../../providers/players/hooks/attackCallback/useOpponentAttackCallback.hook";

const PA_Arena: FC = () => {
    // Hooks
    const { heroData, opponentData, potionData, pokeBallData } = useApiData();
    const { gameState, setGameState, isGameStateOpponentReady } = useGameState();
    const { message, showMessage, clearMessage } = useMessages();

    // TODO Look into this later
    /* const {addClass, removeClass} = usePlayerElement(opponentElement);*/

    const {
        currentOpponentHealth,
        SetCurrentOpponentHealth,
        currentHeroHealth,
        setCurrentHeroHealth,
        heroAttackDamage,
        opponentAttackDamage,
        maxHeroHealth,
    } = usePlayers();

    // Data items
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

    // TODO Need to refactor turnOrder
    // Calculate turn order
    const turnOrder = useCallback(() => {
        if (TURN_ORDER_CHANCE <= 4) {
            setGameState(GameStateEnum.OPPONENT_READY);
            showMessage(MessagesEnum.OPPONENT_MESSAGE_TURN, opponentName);
        } else {
            setGameState(GameStateEnum.HERO_READY);
            showMessage(MessagesEnum.HERO_MESSAGE_TURN, heroName);
        }
    }, [heroName, opponentName, setGameState, showMessage]);

    // Games initial encounter
    useEffect(() => {
        if (gameState === GameStateEnum.GAME_INIT && heroName && opponentName) {
            turnOrder();
            console.count("Rerender");
        }

        if (gameState === GameStateEnum.HERO_DONE && message === undefined) {
            showMessage(MessagesEnum.OPPONENT_MESSAGE_TURN, opponentName);
            setGameState(GameStateEnum.OPPONENT_READY);
            console.log(message);
        }

        if (gameState === GameStateEnum.OPPONENT_DONE && message === undefined) {
            showMessage(MessagesEnum.HERO_MESSAGE_TURN, heroName);
            setGameState(GameStateEnum.HERO_READY);
            console.log(message);
        }
    }, [clearMessage, gameState, heroName, message, opponentName, setGameState, showMessage, turnOrder]);

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
