
import { AbsenceFunctions } from "../../../functions/absence";


export const getMyAbsences = async () => {

    try {
        const data = await AbsenceFunctions.getMyAbsences();
        return data

    } catch (error) {
        console.error('Error:', error);
    }
};