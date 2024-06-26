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

    getAllUsers: async (page = 1) => {

        const data = await axiosSetup.get(`/users?page=${page}`);
        if (data.status === 200) {
            //console.log('users ...');
            return data.data;

        } else {
            console.log(' failed');
        }

    },

    getAllOldUsers: async () => {

        const data = await axiosSetup.get('old-users');
        if (data.status === 200) {
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
            console.log(' failed');
        }

    },

    deleteUser: async (id) => {

        const data = await axiosSetup.delete('/users/' + id);
        if (data.status === 200) {

            return data.data;

        } else {
            console.log(' failed');
        }

    },
    restoreUser: async (id) => {

        const data = await axiosSetup.post('/users-restore/' + id);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    getAuthUser: async () => {

        const data = await axiosSetup.get('/profile');
        if (data.status === 200) {

            return data.data;

        } else {
            console.log(' failed');
        }

    },
    editAuthUser: async (formData) => {
        const formDataWithPatchMethod = {
            ...formData,
            _method: 'PATCH'
        };
        const data = await axiosSetup.post('/profile', formDataWithPatchMethod, {
            method: 'patch'
        });
        if (data.status === 200) {

            return data.data;

        } else {
            console.log(' failed');
        }

    },
    getUser: async (id) => {

        const data = await axiosSetup.get('/users/' + id);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    editUser: async (id, formData) => {
        const formDataWithPatchMethod = {
            ...formData,
            _method: 'PATCH'
        };
        const data = await axiosSetup.post('/users/' + id, formDataWithPatchMethod, {
            method: 'patch'
        });
        if (data.status === 200) {
            return data.data;

        } else {
            console.log(' failed');
        }

    },
    getSearchUsers: async (page = 1, formDataSearch) => {

        const data = await axiosSetup.get(`/search-users?page=${page}&role=${formDataSearch.role}&query=${formDataSearch.query}`);
        if (data.status === 200) {
            return data.data;
            //console.log('data', data)
        } else {
            console.log(' failed');
        }

    },

    Logout: async () => {

        const data = await axiosSetup.delete('/logout');
        if (data.status === 200) {
            return data.data;

        } else {
            console.log(' failed');
        }

    },

    resetLink: async (formData) => {

        const data = await axiosSetup.post('/reset-link/' , formData);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }
    },
    ResetPassWord: async (formData) => {

        const data = await axiosSetup.post('/reset-password/' , formData);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }
    },

    
} 