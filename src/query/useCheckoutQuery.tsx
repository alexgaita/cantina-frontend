import * as CHECKOUT_API from "../api/checkout"
import { useSnackbar } from "../contexts/SnackbarContext";

const useCheckoutQuery = () =>{
    const {failedNotification,successNotification} = useSnackbar();

    const handleSendOrder = async (body: any) => {

        try{
            const reponse =await CHECKOUT_API.sendOrder(body)
            successNotification("Comanda trimisa","Comanda a fost efectuata cu succes")
        }
        catch{
            failedNotification("Eroare","Comanda nu a fost efectuata cu succes")
        }
    } 

    return {
        handleSendOrder
    }
    
}

export default useCheckoutQuery