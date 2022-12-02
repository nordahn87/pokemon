import { FC } from "react";
import { PA_HeroProps } from "./Hero.props";
import { useApiData } from "../../../../hooks/apiData.provider";
import { useAnimation } from "../../../../hooks/animation.provider";
import { useHero } from "../../../../hooks/players/hero.provider";
import "./Hero.scss";

const PA_Hero: FC<PA_HeroProps> = (props) => {
    const { heroElement } = useHero();
    const { heroData } = useApiData();
    const { runningAnimation, setRunningAnimation } = useAnimation();

    const heroSprite = heroData.sprites?.versions["generation-v"]["black-white"].animated.back_default;
    const heroName = heroData.species?.name;

    const animationHeroCallBack = () => {
        switch (runningAnimation) {
            case "HERO_ATTACK":
                props.heroAttackCallback();
                setRunningAnimation(undefined);
                break;
        }
    };

    return (
        <div className="hero-container">
            <img
                className="hero-pokemon"
                ref={heroElement}
                onAnimationEnd={animationHeroCallBack}
                src={heroSprite}
                alt={heroName}
            />
        </div>
    );
};

export default PA_Hero;
