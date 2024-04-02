import { axiosSetup } from "../api/axiosSetup";

export const AbsenceFunctions = {
    getTypes: async () => {
        const data = await axiosSetup.get('/types');
        if (data.status === 200) {
            return data;
        } else {
            console.log(' failed');
        }

    },

    addType: async (formData) => {

        const data = await axiosSetup.post('/absences', formData);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    }

}