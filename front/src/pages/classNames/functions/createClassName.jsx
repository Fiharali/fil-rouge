import { ClassNameFunctions } from "../../../functions/className";
export const createClassName = async (formData) => {
    
    try {

        const data = await ClassNameFunctions.addClassName(formData);
        //console.log(data);
        return { success: true, data };

    } catch (error) {
        console.error('Error:', error);
        return { success: false, error };
        
    }
};