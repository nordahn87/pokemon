import {PA_API} from "../../../../interface/api";

export interface PA_PlayerProps {
    playerData: PA_API;
    attackAnimationEnd: () => void;
}
