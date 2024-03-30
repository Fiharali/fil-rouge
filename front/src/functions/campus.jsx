import { axiosSetup } from "../api/axiosSetup";

export const CampusFunctions = {
    getAllCampuses: async () => {
        const data = await axiosSetup.get('/campuses');
        if (data.status === 200) {
            console.log('users ...');
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    addCampus: async (formData) => {

        const data = await axiosSetup.post('/campuses', formData);
        if (data.status === 200) {

            return data.data;

        } else {
            console.log(' failed');
        }

    },

    deleteCampus: async (id) => {
        const data = await axiosSetup.delete('/campuses/' + id);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },
}