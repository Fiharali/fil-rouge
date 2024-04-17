import { axiosSetup } from "../api/axiosSetup";

export const HomeFunctions = {
    getStatistics: async () => {
        const data = await axiosSetup.get('/home');
        if (data.status === 200) {
            return data;
        } else {
            console.log(' failed');
        }

    },

}