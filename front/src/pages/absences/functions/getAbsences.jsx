
import { AbsenceFunctions } from "../../../functions/absence";


export const getAbsences = async () => {

    try {
        const data = await AbsenceFunctions.getAbsences();
        return data

    } catch (error) {
        console.error('Error:', error);
    }
};