import { axiosSetup } from "../api/axiosSetup";

export const ClassNameFunctions = {
    getAllClassNames: async () => {
        const data = await axiosSetup.get('/classNames');
        if (data.status === 200) {
            console.log('users ...');
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    addClassName: async (formData) => {

        const data = await axiosSetup.post('/classNames', formData);
        if (data.status === 200) {

            return data.data;

        } else {
            console.log(' failed');
        }

    },

    deleteClassName: async (id) => {
        const data = await axiosSetup.delete('/classNames/' + id);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },
}