import { axiosSetup } from "../api/axiosSetup";

export const ApiFunctions = {
    getCsrfToken: async () => {
        return await axiosSetup.get('/sanctum/csrf-cookie');
    },

    Login: async (formData) => {

        const data = await axiosSetup.post('/login', formData);
        if (data.status === 200) {
            console.log('login success');
            return data.data;

        } else {
            console.log('login failed');
        }

    }
} 