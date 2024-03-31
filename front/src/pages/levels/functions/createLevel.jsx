import { LevelFunctions } from "../../../functions/level";
import { PromotionFunctions } from "../../../functions/promotion";
export const createLevel = async (formData) => {
    // console.log('Submit')


    try {

        const data = await LevelFunctions.addLevel(formData);
        //console.log(data);
        return { success: true, data };

    } catch (error) {
        console.error('Error:', error);
        return { success: false, error };
        
    }
};