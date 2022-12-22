import { FC } from "react";
import { usePlayers } from "../../../../providers/players/players.provider";
import "./HeroHealthBar.scss";

const PA_HeroHealthBar: FC = () => {
    const { hero } = usePlayers();

    return (
        <div className="hero-healthbar-container">
            <div className="hero-healthbar-hp">HP</div>
            <div>
                {hero.health.currentHeroHealth}/{hero.health.maxHeroHealth}
            </div>
        </div>
    );
};

export default PA_HeroHealthBar;
