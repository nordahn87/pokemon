import {PA_API} from "../../../../interface/api";

export interface PA_PlayerActionProps {
    playerData: PA_API;
    potionData: PA_API;
    pokeBallData: PA_API;
    handlePlayerAttack: () => void;
}
