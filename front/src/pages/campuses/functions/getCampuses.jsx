import { CampusFunctions } from "../../../functions/campus";
export const getCampuses = async () => {

    try {
        const data = await CampusFunctions.getAllCampuses();
        //console.log(data)
        return data

    } catch (error) {
        console.error('Error:', error);
    }
};