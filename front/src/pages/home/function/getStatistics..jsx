
import {HomeFunctions} from "../../../functions/Home.jsx";


export const getStatistics = async () => {

    try {
        const data = await HomeFunctions.getStatistics();
        return data
    } catch (error) {
        console.error('Error:', error);
    }
};