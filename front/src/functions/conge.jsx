import { axiosSetup } from "../api/axiosSetup";

export const CongeFunctions = {
    getTypes: async () => {
        const data = await axiosSetup.get('/types');
        if (data.status === 200) {
            return data;
        } else {
            console.log(' failed');
        }

    },

    addConge: async (formData) => {

        const data = await axiosSetup.post('/add-conge', formData);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },
    addNewConge: async (formData) => {

        const data = await axiosSetup.post('/conge', formData);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    getConges: async () => {
        const data = await axiosSetup.get('/conge');
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    getMyConges: async () => {
        const data = await axiosSetup.get('/my-conges');
        if (data.status === 200) {
            return data;
        } else {
            console.log(' failed');
        }

    },
    getUsersForConges: async () => {
        const data = await axiosSetup.get('/users-for-conge');
        if (data.status === 200) {
            return data;
        } else {
            console.log(' failed');
        }

    },
    changeStatus: async (id, formData) => {

        const data = await axiosSetup.post('/change-status-conge/' + id, formData);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    deleteConge: async (id) => {
        const data = await axiosSetup.delete('/conges/' + id);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }
    },



}