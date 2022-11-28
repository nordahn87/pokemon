import {PA_API} from "../../../../interface/api";

export interface PA_PlayerProps {
    playerData: PA_API;
    potionData: PA_API;
    pokeBallData: PA_API;
    handlePlayerAttack: () => void;
}
