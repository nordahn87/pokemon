import {PA_API} from "../../../../interface/api";

export interface PA_AttackButtonProps {
    playerData: PA_API;
    handlePlayerAttack: () => void;
    attackAnimationEnd: () => void;
    buttonDisabled: boolean;
}