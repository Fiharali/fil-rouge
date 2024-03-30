import { PromotionFunctions } from "../../../functions/promotion";
export const getPromotions = async () => {

    try {
        const data = await PromotionFunctions.getAllPromotions();
        //console.log(data)
        return data

    } catch (error) {
        console.error('Error:', error);
    }
};