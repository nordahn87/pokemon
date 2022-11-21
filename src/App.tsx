import "../src/styles/global/main.scss";
import PA_Arena from "./components/organisms/Arena/Arena.component";
import {MessagesProvider} from "./hooks/messages.provider";

const App =() => {
    return (
        <MessagesProvider>
            <PA_Arena />
        </MessagesProvider>
  );
}

export default App;
