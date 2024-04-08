
import { ApiFunctions } from "../../../functions/Api";


export const oldUsers = async () => {
    try {
        const data = await ApiFunctions.getAllOldUsers();
        return data
    } catch (error) {
        console.error('Error:', error);
    }
};