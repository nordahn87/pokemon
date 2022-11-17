import React from 'react';
import "../src/styles/global/main.scss";
import PA_Player from "./components/molecules/pokemons/Player/Player.component";
import PA_Opponent from "./components/molecules/pokemons/Opponent/Opponent.component";
import PA_Arena from "./components/organisms/Arena/Arena.component";

function App() {
  return (
        <PA_Arena>
            <PA_Player />
            <PA_Opponent />
        </PA_Arena>
  );
}

export default App;
