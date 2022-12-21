import "../src/styles/global/main.scss";
import PA_Arena from "./components/organisms/Arena/Arena.component";
import { MessagesProvider } from "./providers/messages.provider";
import { ApiDataProvider } from "./providers/apiData.provider";
import { AnimationProvider } from "./providers/animation.provider";
import { PlayersProvider } from "./providers/players/players.provider";
import { GameStateProvider } from "./providers/gamestate.provider";

const App = () => {
    return (
        <ApiDataProvider>
            <GameStateProvider>
                <MessagesProvider>
                    <AnimationProvider>
                        <PlayersProvider>
                            <PA_Arena />
                        </PlayersProvider>
                    </AnimationProvider>
                </MessagesProvider>
            </GameStateProvider>
        </ApiDataProvider>
    );
};

export default App;
