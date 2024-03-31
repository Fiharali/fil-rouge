import { axiosSetup } from "../api/axiosSetup";

export const LevelFunctions = {
    getAllLevels: async () => {
        const data = await axiosSetup.get('/levels');
        if (data.status === 200) {
            console.log('users ...');
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    addLevel: async (formData) => {

        const data = await axiosSetup.post('/levels', formData);
        if (data.status === 200) {

            return data.data;

        } else {
            console.log(' failed');
        }

    },

    deleteLevel: async (id) => {
        const data = await axiosSetup.delete('/levels/' + id);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },
}