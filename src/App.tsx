import "../src/styles/global/main.scss";
import PA_Arena from "./components/organisms/Arena/Arena.component";
import { MessagesProvider } from "./hooks/messages.provider";
import { ApiDataProvider } from "./hooks/apiData.provider";
import { HeroProvider } from "./hooks/players/hero.provider";
import { OpponentProvider } from "./hooks/players/opponent.provider";
import { AnimationProvider } from "./hooks/animation.provider";

const App = () => {
    return (
        <ApiDataProvider>
            <MessagesProvider>
                <AnimationProvider>
                    <HeroProvider>
                        <OpponentProvider>
                            <PA_Arena />
                        </OpponentProvider>
                    </HeroProvider>
                </AnimationProvider>
            </MessagesProvider>
        </ApiDataProvider>
    );
};

export default App;
