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

    addAbsence: async (formData) => {

        const data = await axiosSetup.post('/absences', formData);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },
    addNewAbsence: async (formData) => {

        const data = await axiosSetup.post('/add-absence', formData);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    getAbsences: async () => {
        const data = await axiosSetup.get('/absences');
        if (data.status === 200) {
            return data;
        } else {
            console.log(' failed');
        }

    },

    getMyAbsences: async () => {
        const data = await axiosSetup.get('/my-absences');
        if (data.status === 200) {
            return data;
        } else {
            console.log(' failed');
        }

    },
    getUsersForAbsences: async () => {
        const data = await axiosSetup.get('/users-for-absence');
        if (data.status === 200) {
            return data;
        } else {
            console.log(' failed');
        }

    },
    changeStatus: async (id,formData) => {

        const data = await axiosSetup.post('/change-status-absence/'+ id , formData);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }

    },

    deleteAbsence: async (id) => {
        const data = await axiosSetup.delete('/absences/' + id);
        if (data.status === 200) {
            return data.data;
        } else {
            console.log(' failed');
        }
    },

    

}