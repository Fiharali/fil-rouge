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

    }
} 