import "../src/styles/global/main.scss";
import PA_Arena from "./components/organisms/Arena/Arena.component";
import { MessagesProvider } from "./providers/messages.provider";
import { DataProvider } from "./providers/data.provider";
import { AnimationProvider } from "./providers/animation.provider";
import { PlayersProvider } from "./providers/players/players.provider";
import { GameStateProvider } from "./providers/gamestate.provider";

const App = () => {
    return (
        <DataProvider>
            <GameStateProvider>
                <MessagesProvider>
                    <AnimationProvider>
                        <PlayersProvider>
                            <PA_Arena />
                        </PlayersProvider>
                    </AnimationProvider>
                </MessagesProvider>
            </GameStateProvider>
        </DataProvider>
    );
};

export default App;
