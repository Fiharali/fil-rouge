import { CampusFunctions } from "../../../functions/campus";
export const createCampus = async (formData) => {
    // console.log('Submit')


    try {

        const data = await CampusFunctions.addCampus(formData);
        //console.log(data);
        return { success: true, data };

    } catch (error) {
        console.error('Error:', error);
        return { success: false, error };
        
    }
};