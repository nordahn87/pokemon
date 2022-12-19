import "../src/styles/global/main.scss";
import PA_Arena from "./components/organisms/Arena/Arena.component";
import { MessagesProvider } from "./hooks/messages.provider";
import { ApiDataProvider } from "./hooks/apiData.provider";
import { AnimationProvider } from "./hooks/animation.provider";
import { PlayersProvider } from "./hooks/players.provider";
import { GameStateProvider } from "./hooks/gamestate.provider";
import { CaptureOpponentProvider } from "./hooks/capture.provider";

const App = () => {
    return (
        <ApiDataProvider>
            <GameStateProvider>
                <MessagesProvider>
                    <AnimationProvider>
                        <CaptureOpponentProvider>
                            <PlayersProvider>
                                <PA_Arena />
                            </PlayersProvider>
                        </CaptureOpponentProvider>
                    </AnimationProvider>
                </MessagesProvider>
            </GameStateProvider>
        </ApiDataProvider>
    );
};

export default App;
