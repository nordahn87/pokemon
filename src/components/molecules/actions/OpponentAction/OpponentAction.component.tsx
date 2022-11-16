import {FC, useEffect, useState} from "react";
import PA_OpponentHealthBar from "../../../atoms/healthBar/OpponentHealthBar/OpponentHealthBar.component";
import './OpponentAction.scss'
import {PA_API} from "../../../../interface/api";
import {API_BASE_URL} from "../../../../constants/baseUrls";
import {ENDPOINT_OPPONENT} from "../../../../constants/endpoints";

const PA_OpponentAction:FC = () => {
    const [opponentData, setOpponentData ] = useState<PA_API>({})

    useEffect(() => {
        fetch(`${API_BASE_URL}${ENDPOINT_OPPONENT}`)
            .then((response) => response.json())
            .then((data) => {
                setOpponentData(data)
            })
    }, []);

    return (
        <div className="opponent-action-wrapper">
            <div className="opponent-name">
                {opponentData.name}
            </div>
            <PA_OpponentHealthBar />
        </div>
    );
};

export default PA_OpponentAction;
