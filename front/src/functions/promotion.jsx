import { axiosSetup } from "../api/axiosSetup";

export const PromotionFunctions = {
    getAllPromotions: async () => {
        const data = await axiosSetup.get('/promotions');
        if (data.status === 200) {
            console.log('users ...');
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    addPromotion: async (formData) => {

        const data = await axiosSetup.post('/promotions', formData);
        if (data.status === 200) {

            return data.data;

        } else {
            console.log(' failed');
        }

    },

    deletePromotion: async (id) => {
        const data = await axiosSetup.delete('/promotions/' + id);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },
}