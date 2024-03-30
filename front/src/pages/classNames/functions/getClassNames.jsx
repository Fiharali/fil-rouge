import { ClassNameFunctions } from "../../../functions/className";
export const getClassNames = async () => {

    try {
        const data = await ClassNameFunctions.getAllClassNames();
        //console.log(data)
        return data

    } catch (error) {
        console.error('Error:', error);
    }
};