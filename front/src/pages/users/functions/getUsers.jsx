
import { ApiFunctions } from "../../../functions/Api";


export const getUsers = async () => {

    try {
        const data = await ApiFunctions.getAllUsers();
        return data

    } catch (error) {
        console.error('Error:', error);
    }
};