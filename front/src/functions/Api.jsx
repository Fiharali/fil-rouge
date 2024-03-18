import { axiosSetup } from "../api/axiosSetup";

export const ApiFunctions = {
    getCsrfToken: async () => {
        await axiosSetup.get('/sanctum/csrf-cookie');
    },


    Login: async (formData) => {

        const data = await axiosSetup.post('/login', formData);
        if (data.status === 200) {
            console.log('login success');
            return data.data;

        } else {
            console.log('login failed');
        }

    },


    Register: async (formData) => {

        const data = await axiosSetup.post('/register', formData);
        if (data.status === 200) {
            console.log('register success');
            return data.data;

        } else {
            console.log('register failed');
        }

    },

    getAllUsers: async () => {

        const data = await axiosSetup.get('/users');
        if (data.status === 200) {
            console.log('users ...');
            return data.data;

        } else {
            console.log(' failed');
        }

    },

    addUser: async (formData) => {

        const data = await axiosSetup.post('/users', formData);
        if (data.status === 200) {
          
            return data.data;

        } else {
            console.log('login failed');
        }

    },
} 