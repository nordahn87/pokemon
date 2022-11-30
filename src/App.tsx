import "../src/styles/global/main.scss";
import PA_Arena from "./components/organisms/Arena/Arena.component";
import {MessagesProvider} from "./hooks/messages.provider";
import {PokemonProvider} from "./hooks/pokemon.provider";
import {ApiDataProvider} from "./hooks/apiData.provider";

const App =() => {
    return (
        <ApiDataProvider>
            <MessagesProvider>
                <PokemonProvider>
                    <PA_Arena />
                </PokemonProvider>
            </MessagesProvider>
        </ApiDataProvider>
  );
}

export default App;
