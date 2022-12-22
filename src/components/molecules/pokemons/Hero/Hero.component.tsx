import { FC } from "react";
import { PA_HeroProps } from "./Hero.props";
import { Action } from "../../../../models/action";
import { useAnimation } from "../../../../providers/animation.provider";
import { usePlayers } from "../../../../providers/players/players.provider";
import "./Hero.scss";

const PA_Hero: FC<PA_HeroProps> = (props) => {
    const { hero } = usePlayers();
    const { runningAnimation, setRunningAnimation } = useAnimation();

    const animationHeroCallBack = () => {
        switch (runningAnimation) {
            case Action.HERO_ACTION_ATTACK:
                props.heroAttackCallback();
                setRunningAnimation(undefined);
                break;
        }
    };

    return (
        <div className="hero-container">
            <img
                className="hero-pokemon"
                ref={hero.heroElement}
                onAnimationEnd={animationHeroCallBack}
                src={hero.heroSprite}
                alt={hero.heroName}
            />
        </div>
    );
};

export default PA_Hero;
