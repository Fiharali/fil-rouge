
import { CongeFunctions } from "../../../functions/conge";


export const getMyConges = async () => {

    try {
        const data = await CongeFunctions.getMyConges();
        return data
    } catch (error) {
        console.error('Error:', error);
    }
};