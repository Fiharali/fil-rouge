
import { CongeFunctions } from "../../../functions/conge";


export const getConge = async () => {

    try {
        const data = await CongeFunctions.getConges();
        return data
    } catch (error) {
        console.error('Error:', error);
    }
};