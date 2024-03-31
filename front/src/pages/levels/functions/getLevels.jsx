import { LevelFunctions } from "../../../functions/level";
export const getLevels = async () => {

    try {
        const data = await LevelFunctions.getAllLevels();
        //console.log(data)
        return data

    } catch (error) {
        console.error('Error:', error);
    }
};