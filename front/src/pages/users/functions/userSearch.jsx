
import { ApiFunctions } from "../../../functions/Api";


export const getSearchUsers = async (page=1,formDataSearch) => {

    try {
        const data = await ApiFunctions.getSearchUsers(page,formDataSearch);
        return data

    } catch (error) {
        console.error('Error:', error);
    }
};