import React, {FC, useCallback, useEffect, useState} from "react";
import {MessagesEnum} from "../../../models/messages.enum";
import {GameStateEnum} from "../../../models/gameState.enum";
import {useApiData} from "../../../hooks/apiData.provider";
import {useMessages} from "../../../hooks/messages.provider";
import {useHero} from "../../../hooks/players/hero.provider";
import {useOpponent} from "../../../hooks/players/opponent.provider";
import {ClassListAdd, ClassListRemove} from "../../../helpers/classList.helper";
import PA_Hero from "../../molecules/pokemons/Hero/Hero.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import PA_HeroAction from "../../molecules/actions/HeroAction/HeroAction.component";
import PA_OpponentAction from "../../molecules/actions/OpponentAction/OpponentAction.component";
import PA_MessageBox from "../../molecules/MessageBox/MessageBox.component";
import './Arena.scss'
import {useAnimation} from "../../../hooks/animation.provider";

const PA_Arena:FC = () => {

    const [ gameState, setGameState ] = useState(GameStateEnum.GAME_IDLE);

    // Hooks
    const { heroData, opponentData } = useApiData();
    const { showMessage, clearMessage } = useMessages();
    const { message } = useMessages();
    const { heroElement} = useHero();
    const { runningAnimation, setRunningAnimation } =useAnimation();
    const { currentOpponentHealth, SetCurrentOpponentHealth, opponentElement } = useOpponent();

    // Attack
    const [quickAttackDamage, setQuickAttackDamage] = useState<number | null>(null)

    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;

    //Hero attacks - might add more damage types later on!
    useEffect(() => {
        setQuickAttackDamage(7);
        setGameState(GameStateEnum.HERO_READY)
    },[]);


    // Hero doing quick attack
    const handleHeroAttack = useCallback(() => {
        setGameState(GameStateEnum.HERO_ACT)
        clearMessage();
        ClassListAdd(heroElement, "hero-attack-animation")
        ClassListAdd (opponentElement, "opponent-takes-damage-animation")
        setRunningAnimation("HERO_ATTACK");
    },[clearMessage, heroElement, opponentElement, setRunningAnimation])


    const heroAttackCallback = useCallback(() => {
        const updatedCurrentOpponentHealth = currentOpponentHealth! - quickAttackDamage!
        setGameState(GameStateEnum.HERO_READY)
        ClassListRemove(heroElement, "hero-attack-animation");
        ClassListRemove(opponentElement, "opponent-takes-damage-animation");
        
        if (updatedCurrentOpponentHealth <= 0) {
            SetCurrentOpponentHealth(0)
            showMessage(MessagesEnum.OPPONENT_KO, opponentName);
        } else {
            SetCurrentOpponentHealth(updatedCurrentOpponentHealth)
            showMessage(MessagesEnum.HERO_ATTACK, heroName, opponentName, quickAttackDamage);
        }
    },[SetCurrentOpponentHealth, currentOpponentHealth, heroElement, heroName, opponentElement, opponentName, quickAttackDamage, showMessage])

    return (
        <>
            <div style={{ backgroundColor: 'white', zIndex: 4 }}>
                <div>
                    Gamestate:
                    {JSON.stringify(gameState)}
                </div>
                <div>
                    Animationstate:
                    {JSON.stringify(runningAnimation)}
                </div>
            </div>
            <div className="arena-wrapper">

                <div>
                    {message && message !== "" ? (
                        <PA_MessageBox />
                    ) : null}

                    <PA_Hero heroAttackCallback={heroAttackCallback} />

                    <PA_HeroAction
                        handleHeroAttack={handleHeroAttack}
                        disableButton={gameState !== "HERO_READY"}
                    />
                </div>

                <div>
                    <PA_OpponentAction />

                    <PA_Opponent />

                    <button onClick={() => {console.log("Opponent attack test")}}>
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
