import {FC} from "react";
import {PA_MessageBoxProps} from "./MessageBox.props";
import './MessageBox.scss';
import {useMessages} from "../../../hooks/messages.provider";

const PA_MessageBox:FC<PA_MessageBoxProps> = (props) => {
    const { message, clearMessage } = useMessages();
    console.log(message);

    // TODO: Run clearMessage after some time.

    return (
         <div className="message-container">
            {message}
         </div>
    );
};

export default PA_MessageBox;
