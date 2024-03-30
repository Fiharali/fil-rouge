import { CampusFunctions } from "../../../functions/campus";
import { PromotionFunctions } from "../../../functions/promotion";
export const createPromotion = async (formData) => {
    // console.log('Submit')


    try {

        const data = await PromotionFunctions.addPromotion(formData);
        //console.log(data);
        return { success: true, data };

    } catch (error) {
        console.error('Error:', error);
        return { success: false, error };
        
    }
};