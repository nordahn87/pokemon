import "../src/styles/global/main.scss";
import PA_Arena from "./components/organisms/Arena/Arena.component";
import {MessagesProvider} from "./hooks/messages.provider";
import {PokemonProvider} from "./hooks/pokemon.provider";

const App =() => {
    return (
        <MessagesProvider>
            <PokemonProvider>
                <PA_Arena />
            </PokemonProvider>
        </MessagesProvider>
  );
}

export default App;
