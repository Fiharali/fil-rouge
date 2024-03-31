
import { ApiFunctions } from "../../../functions/Api";


export const getUsers = async (page=1) => {

    try {
        const data = await ApiFunctions.getAllUsers(page);
        return data

    } catch (error) {
        console.error('Error:', error);
    }
};