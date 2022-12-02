import { FC } from "react";
import { useHero } from "../../../../hooks/players/hero.provider";
import "./HeroHealthBar.scss";

const PA_HeroHealthBar: FC = () => {
    const { currentHeroHealth, maxHeroHealth } = useHero();

    return (
        <div className="hero-healthbar-container">
            <div className="hero-healthbar-hp">HP</div>
            <div>
                {currentHeroHealth}/{maxHeroHealth}
            </div>
        </div>
    );
};

export default PA_HeroHealthBar;
