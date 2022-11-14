import React from 'react';
import PA_Player from "./player/Player.component";
import PA_Opponent from "./opponent/Opponent.component";
import PA_Arena from "./arena/Arena.component";

function App() {
  return (
        <PA_Arena>
            <PA_Player />
            <PA_Opponent />
        </PA_Arena>
  );
}

export default App;
