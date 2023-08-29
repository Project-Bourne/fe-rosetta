// import { toast } from "react-toastify";
import  React  from "react";
import ReactDOM from "react-dom";
import CustomToast, { ToastModel } from "../components/ui/CustomToast";

interface Props {
    message: any,
    addedText?: any,
    position?: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-right' | 'top-left' | 'top-center'
}


class NotificationService { 
    static showCustomToast({type, message, addedText, position}:ToastModel) {
        const container = document.createElement('div');
        document.body.appendChild(container);

        ReactDOM.render(
            <CustomToast 
                type={type} 
                message={message} 
                addedText={addedText} 
                position={position}
                />,
            container
        );

        // Automatically remove the notification after 5 seconds
        setTimeout(() => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        }, 3000);
    }
    
    static success({ message, addedText, position }: Props) {
       this.showCustomToast({
        type: 'success', 
        message, 
        addedText, 
        position
    })
    }

    static error({ message, addedText, position }: Props) {
        this.showCustomToast({
            type: 'error', 
            message, 
            addedText, 
            position
        })
    }

    static warn({ message, addedText, position }: Props) {
        this.showCustomToast({
            type: 'warn', 
            message, 
            addedText, 
            position
        })
    } 

    // static info(message: any, addedText?: any) {
    //       this.showCustomToast({
        // type: 'warn', 
        // message, 
        // addedText, 
        // position
    // })
    // }

   
 }


 export default NotificationService;