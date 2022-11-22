import {FC, useEffect} from "react";
import {PA_MessageBoxProps} from "./MessageBox.props";
import {useMessages} from "../../../hooks/messages.provider";
import './MessageBox.scss';

const PA_MessageBox:FC<PA_MessageBoxProps> = (props) => {
    const { message } = useMessages();

    // TODO: Run clearMessage after some time.

    return (
         <div className="message-container">
            {message}
         </div>
    );
};

export default PA_MessageBox;
